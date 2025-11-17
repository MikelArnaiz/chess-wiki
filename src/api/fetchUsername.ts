import { createFailureStatus, createSuccessStatus } from '../utils/Status'
import { getPlayerAPI } from './endpoints'

export type PlayerJSON = {
  avatar?: string
  player_id: number
  '@id': string
  url: string
  name?: string
  username: string
  title: string
  followers: number
  country: string
  location: string
  last_online: number
  joined: number
  status: string
  is_streamer: boolean
  verified: boolean
  league: string
  streaming_platforms: string[]
}

export async function fetchPlayer(username: string) {
  try {
    const url = getPlayerAPI(username)
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Fetching player API failed')
    }

    const result = (await response.json()) as PlayerJSON
    return createSuccessStatus({
      ...result,
      last_online: result.last_online * 1000,
      joined: result.joined * 1000,
    })
  } catch {
    return createFailureStatus()
  }
}
