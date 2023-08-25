import { Injectable } from '@nestjs/common';
import Web3 from 'web3';

@Injectable()
export class Web3Service {
  private readonly web3: Web3;

  constructor() {
    this.web3 = new Web3('https://mainnet.infura.io/v3/INFURA_PROJECT_ID');
  }

  async getBalance(address: string): Promise<bigint> {
    return this.web3.eth.getBalance(address);
  }
}