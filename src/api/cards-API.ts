import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:7542/2.0/'
      : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const cardsAPI = {
  getPacks(page: number, pageCount: number) {
    return instance.get(`/cards/pack`, {
      params: {
        page: 1,
        pageCount: 10,
      },
    })
  },
  addNewPack(data: addNewPackDataType) {
    return instance.post<addNewPackDataType, AxiosResponse<addNewPackResponseType>>(
      '/cards/pack',
      data
    )
  },
  deletePack(packID: string) {
    return instance.delete<AxiosResponse<DeletePackResponseType>>(`/cards/pack?id=${packID}`)
  },
  getCards(cardsPackId: string) {
    return instance.get<AxiosResponse<GetCardsResponseType>>(`/cards/card/${cardsPackId}`)
  },
}
type ResponsePackType = {
  cardPacks: [
    {
      _id: string
      user_id: string
      user_name: string
      name: string
      cardsCount: number
      updated: string
    }
  ]
  cardPacksTotalCount: number
  page: number
  pageCount: number
}
type GetCardsResponseType = {
  cards: [
    {
      answer: string
      question: string
      cardsPack_id: string
      grade: number
      shots: number
      user_id: string
      created: string
      updated: string
      _id: string
    }
  ]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}
export type addNewPackDataType = {
  cardsPack: {
    name?: string
    deckCover?: string
    private?: boolean
  }
}
export type addNewPackResponseType = {
  newCardsPack: PackResponseType
  token: string
  tokenDeathTime: number
}
export type PackResponseType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}
export type DeletePackResponseType = {
  deletedCardsPack: PackResponseType
  token: string
  tokenDeathTime: number
}
