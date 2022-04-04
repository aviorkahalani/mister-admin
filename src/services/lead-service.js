import axios from 'axios'
import { utilService } from './util-service'

export const leadService = {
  query,
  setFilterBy,
  getPerStatusStats,
  getPerSrcStats,
  getStatusName,
  getSrcName,
}

const STORAGE_KEY = 'leads_db'
const URL =
  'http://www.filltext.com/?rows=20&id={string|5}&src=[1,2,3]&status=[1,2,3,4]&updatedAt={date|10-10-2019,10-12-2020}&fullname={firstName}~{lastName}&email={email}&phone={phone|format}&price={number|100}&txt={lorem}&@countries={rows=2*name={country}*score={decimalRange|10000,20000}}&pretty=true'

let gLeads
_createLeads()

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

function query() {
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

async function _createLeads() {
  let leads = utilService.loadFromStorage(STORAGE_KEY)
  if (!leads || !leads.length) {
    let res = await axios.get(URL)
    leads = res.data
    utilService.saveToStorage(STORAGE_KEY, leads)
  }
  gLeads = leads
}
