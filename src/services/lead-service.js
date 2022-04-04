import axios from 'axios'
import { utilService } from './util-service'

export const leadService = {
  query,
  setFilterBy,
  getPerStatusStats,
  getPerSrcStats,
  getStatusName,
  getSrcName,
  getRevenue,
}

const STORAGE_KEY = 'leads_db'
const URL =
  'http://www.filltext.com/?rows=50&id={string|5}&src=[1,2,3]&status=[1,2,3,4]&updatedAt={date|1-1-2021,1-1-2022}&fullname={firstName}~{lastName}&email={email}&phone={phone|format}&price={number|1000}&txt={lorem}&@countries={rows=2*name={country}*score={decimalRange|10000,20000}}&pretty=true'

let gLeads
let gFilterBy = {}

const statuses = {
  1: 'open',
  2: 'process',
  3: 'hold',
  4: 'done',
}

const srcs = {
  1: 'Google',
  2: 'Facebook',
  3: 'Direct Search',
}

async function query() {
  await _createLeads()
  return Promise.resolve(gLeads)
}

function setFilterBy(filterBy) {
  gFilterBy = filterBy
}

function getStatusName(status) {
  return statuses[status]
}

function getSrcName(src) {
  return srcs[src]
}

function getPerStatusStats() {
  return gLeads.reduce((acc, lead) => {
    acc[statuses[lead.status]] = acc[statuses[lead.status]]
      ? acc[statuses[lead.status]] + 1
      : 1
    return acc
  }, {})
}

function getPerSrcStats() {
  return gLeads.reduce((acc, lead) => {
    acc[srcs[lead.src]] = acc[srcs[lead.src]] ? acc[srcs[lead.src]] + 1 : 1
    return acc
  }, {})
}

async function getRevenue() {
  return gLeads.reduce((acc, lead) => {
    const date = new Date(lead.updatedAt)
    // const month = date.toLocaleString().split(',')[0].split('/')[0]
    const month = date.toString().split(' ')[1]
    acc[month] = acc[month] ? acc[month] + lead.price : lead.price
    return acc
  }, {})
}

async function _createLeads() {
  gLeads = utilService.loadFromStorage(STORAGE_KEY) || []
  if (!gLeads || !gLeads.length) {
    let { data } = await axios.get(URL)
    gLeads = data
    utilService.saveToStorage(STORAGE_KEY, gLeads)
  }
}
