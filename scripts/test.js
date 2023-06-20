import http from 'k6/http';
import { SharedArray } from 'k6/data';
import { sleep } from 'k6';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';


//const sharedData = [{"url":"/1", "speedsize-url":"/sample"}]
const speedsize_domain = "https://cdn.speedsize.com"
const cvs_domain = "https://www.cvs.com"
const scene7_domain = "https://s7d1.scene7.com"

const sharedData = new SharedArray("URLs", function () {
    let data = papaparse.parse(open('image_load_testing.csv'), { header: true }).data
    return data;
});

export const options = {
    //vus: 100,
    //iterations: 2500
    //duration: '30s',
    vus: 2,
    iterations: 2
};


export default function () {
    sharedData.forEach(e => {
        console.log(e['url'])
        let req = speedsize_domain + e['speedsize-url']
        let res = http.get(req);
    });
}
