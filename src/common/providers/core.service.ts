import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class CoreService {
	private logger = new Logger(CoreService.name);
	constructor() { }

	delay = (ms: number): Promise<any> => new Promise(resolve => setTimeout(resolve, ms))

	extensionFromFilename = (filename: string): string | undefined => {
		const strArray = filename.split('.')
		// if filename has no extension
		if (strArray.length < 2) return undefined
		// else return extension
		return strArray.pop()
	}

	contentTypeFromExt = (ext: string): string | undefined => {
		switch (ext.toLowerCase()) {
			case 'jpg':
				return 'image/jpeg'
			case 'jpeg':
				return 'image/jpeg'
			case 'png':
				return 'image/png'
			case 'svg':
				return 'image/svg+xml'
			case 'gif':
				return 'image/gif'
			case 'webp':
				return 'image/webp'
			case 'avif':
				return 'image/avif'
			case 'mp4':
				return 'video/mp4'
			case 'bmp':
				return 'image/bmp'
			case 'tiff':
				return 'image/tiff'
			default:
				return undefined
		}
	}

	processIPFSURL = (image: string): string => {
		let prefix
		if (!process.env.IPFS_WEB_GATEWAY) {
			prefix = 'https://cloudflare-ipfs.com/ipfs/'
		} else {
			const prefixes = process.env.IPFS_WEB_GATEWAY.split(',')
			if (!prefixes.length) {
				prefix = 'https://cloudflare-ipfs.com/ipfs/'
			} else {
				// we pick prefix randomly to avoid dependency on just one gateway
				prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
				if (!prefix.startsWith('https://')) {
					prefix = 'https://cloudflare-ipfs.com/ipfs/'
				}
			}
		}

		if (image == null) {
			return null
		} else if (image.indexOf('ipfs://ipfs/') === 0) {
			return prefix + image.slice(12)
		} else if (image.indexOf('ipfs://') === 0) {
			return prefix + image.slice(7)
		} else if (image.indexOf('https://ipfs.io/ipfs/') === 0) {
			return prefix + image.slice(21)
		} else if (image.indexOf('https://ipfs.infura.io/ipfs/') === 0) {
			return prefix + image.slice(28)
		} else if (image.indexOf('https://infura-ipfs.io/ipfs/') === 0) {
			return prefix + image.slice(28)
		} else if (image.indexOf('pinata.cloud/ipfs/') !== -1) {
			const index = image.indexOf('pinata.cloud/ipfs/')
			return prefix + image.slice(index + 18)
		} else if (image.indexOf('ar://') === 0) {
			return 'https://arweave.net/' + image.slice(5)
		} else {
			return image
		}
	}

	fetchWithTimeout = async (resource: any, options: any): Promise<any> => {
		try {
			const { timeout = 8000 } = options
			const controller = new AbortController()
			const id = setTimeout(() => controller.abort(), timeout)
			const response = await fetch(resource, {
				...options,
				signal: controller.signal,
			})
			clearTimeout(id)
			return response
		} catch (error) {
			console.error(error, `fetchWithTimeout error, resource: ${resource}, options: ${options}`)
		}
	}

	generateSVGFromBase64String = (base64String: string): string => {
		return `<svg width="600" height="600"
  xmlns="http://www.w3.org/2000/svg">
  <image xmlns="http://www.w3.org/2000/svg" href="${base64String}" width="600" height="600"/>
</svg>`
	}

	findDuplicatesByProperty = <T>(arr: T[], property: string): T[] => {
		const hash: { [key: string]: boolean } = {}
		const duplicates: T[] = []

		for (let i = 0; i < arr.length; i++) {
			if (hash[arr[i][property]]) {
				duplicates.push(arr[i])
			} else {
				hash[arr[i][property]] = true
			}
		}

		return duplicates
	}
}	
