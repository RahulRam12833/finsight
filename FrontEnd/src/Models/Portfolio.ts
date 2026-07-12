export type PortfolioGet={
    id:number;
    symbol:string;
    name:string;
    industry:string;
    marketCap:number;
    dividendYield:number;
    comments:any;
}

export type PortfolioPost={
    symbol:string;
}