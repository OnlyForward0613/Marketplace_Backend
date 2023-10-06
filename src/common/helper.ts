import { BigNumber, utils } from "ethers"

export const checkSum = (input: string): string => {
	return utils.getAddress(input)
}

export const bigNumber = BigNumber.from

export const bigNumberToHex = (v: unknown): string => bigNumber(v)._hex

export const bigNumberToString = (v: unknown): string => bigNumber(v).toString()

export const bigNumberToNumber = (v: unknown): number => Number(bigNumber(v))