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
  getCountries,
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

  let filteredLeads = JSON.parse(JSON.stringify(gLeads))

  if (gFilterBy.txt) {
    const regex = new RegExp(gFilterBy.txt, 'i')
    filteredLeads = filteredLeads.filter((lead) => regex.test(lead.txt))
  }

  if (gFilterBy.countries?.length) {
    filteredLeads = filteredLeads.filter((lead) => {
      return lead.countries.some((c) => gFilterBy.countries.includes(c.name))
    })
  }

  return Promise.resolve(filteredLeads)
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

async function getPerStatusStats() {
  const leads = await query(gFilterBy)
  return leads.reduce((acc, lead) => {
    acc[statuses[lead.status]] = acc[statuses[lead.status]]
      ? acc[statuses[lead.status]] + 1
      : 1
    return acc
  }, {})
}

async function getPerSrcStats() {
  const leads = await query(gFilterBy)
  return leads.reduce((acc, lead) => {
    acc[srcs[lead.src]] = acc[srcs[lead.src]] ? acc[srcs[lead.src]] + 1 : 1
    return acc
  }, {})
}

async function getRevenue() {
  const leads = await query(gFilterBy)
  return leads.reduce((acc, lead) => {
    const date = new Date(lead.updatedAt)
    // const month = date.toLocaleString().split(',')[0].split('/')[0]
    const month = date.toString().split(' ')[1]
    acc[month] = acc[month] ? acc[month] + lead.price : lead.price
    return acc
  }, {})
}

async function getCountries() {
  let countries = gLeads.map((lead) => {
    return lead.countries.map((country) => country.name)
  })
  return Array.from(new Set(countries.flat()))
}

async function _createLeads() {
  gLeads = utilService.loadFromStorage(STORAGE_KEY) || []
  if (!gLeads || !gLeads.length) {
    let { data } = await axios.get(URL)
    gLeads = data
    utilService.saveToStorage(STORAGE_KEY, gLeads)
  }
}
