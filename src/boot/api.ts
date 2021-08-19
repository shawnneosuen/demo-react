import axios from "axios";

const NODE_ENV = 'development';

const ip = {
    local: '192.168.56.102',
    development: '10.25.105.41',
    production: '10.0.1.10'
  };
  
  const apiQuery = 'http://' + ip[NODE_ENV] + ':' + 80 + '/api/query';

export async function query(sql: string) {
    let queryData:any;
    let error:string = '';
    await axios.post(apiQuery,sql).then((response) => {
        queryData = response.data
    }).catch(()=> {
        error = '未查询到数据'
    })
    if (error){
        console.error(error);
    }
    return queryData
}