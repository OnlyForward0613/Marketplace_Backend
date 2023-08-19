
import { Injectable } from '@nestjs/common';

import { Seaport } from "@opensea/seaport-js";
import { JsonRpcProvider } from "ethers";

@Injectable()
export class SeaportService {
  private seaport: Seaport;

  constructor() {
    // Initialize Seaport instance with your Ethereum provider and OpenSea API key
    const provider = new JsonRpcProvider('')
    const seaport = new Seaport(provider);
      }

  getSeaportInstance(): Seaport {
    return this.seaport;
  }
}