import { useRuntimeConfig } from '#imports'
import { readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const ip = body.ipSearch

    if (!ip) {
      throw createError({
        statusCode: 400,
        statusMessage: 'IP address is required'
      })
    }

    const { ipfyApiKey } = useRuntimeConfig()
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${ipfyApiKey}&ipAddress=${ip}`

    const response = await fetch(url)
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: 'Failed to fetch IP data: ' + response.statusText
      })
    }

    const data = await response.json()
    console.log(data);
    
    return data
  } catch (error) {
    console.error('Error fetching IP data:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch IP data',
      data: error.data || error.message
    })
  }
})
