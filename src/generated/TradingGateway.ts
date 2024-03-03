// import { LocalDateConverter } from "@adaptive/hydra-codecs/dist/valueConverters"
// import * as HydraPlatform from "@adaptive/hydra-platform"


// export type LocalDate = LocalDateConverter.ConvertedType

export enum TradeStatus {
    Pending = "Pending",
    Done = "Done",
    Rejected = "Rejected",
}

export enum Direction {
    Buy = "Buy",
    Sell = "Sell",
}

export const RFQ_CREATED_RFQ_UPDATE = "rfqCreated",
    QUOTE_CREATED_RFQ_UPDATE = "quoteCreated",
    QUOTE_QUOTED_RFQ_UPDATE = "quoteQuoted",
    QUOTE_PASSED_RFQ_UPDATE = "quotePassed",
    QUOTE_ACCEPTED_RFQ_UPDATE = "quoteAccepted",
    RFQ_CLOSED_RFQ_UPDATE = "rfqClosed",
    START_OF_STATE_OF_THE_WORLD_RFQ_UPDATE = "startOfStateOfTheWorld",
    END_OF_STATE_OF_THE_WORLD_RFQ_UPDATE = "endOfStateOfTheWorld"

export type RfqCreatedRfqUpdate = {
    type: typeof RFQ_CREATED_RFQ_UPDATE
    payload: RfqBody
}
export type QuoteCreatedRfqUpdate = {
    type: typeof QUOTE_CREATED_RFQ_UPDATE
    payload: QuoteBody
}
export type QuoteQuotedRfqUpdate = {
    type: typeof QUOTE_QUOTED_RFQ_UPDATE
    payload: QuoteBody
}
export type QuotePassedRfqUpdate = {
    type: typeof QUOTE_PASSED_RFQ_UPDATE
    payload: QuoteBody
}
export type QuoteAcceptedRfqUpdate = {
    type: typeof QUOTE_ACCEPTED_RFQ_UPDATE
    payload: QuoteBody
}
export type RfqClosedRfqUpdate = {
    type: typeof RFQ_CLOSED_RFQ_UPDATE
    payload: RfqBody
}
export type StartOfStateOfTheWorldRfqUpdate = {
    type: typeof START_OF_STATE_OF_THE_WORLD_RFQ_UPDATE
}
export type EndOfStateOfTheWorldRfqUpdate = {
    type: typeof END_OF_STATE_OF_THE_WORLD_RFQ_UPDATE
}
export type RfqUpdate =
    | RfqCreatedRfqUpdate
    | QuoteCreatedRfqUpdate
    | QuoteQuotedRfqUpdate
    | QuotePassedRfqUpdate
    | QuoteAcceptedRfqUpdate
    | RfqClosedRfqUpdate
    | StartOfStateOfTheWorldRfqUpdate
    | EndOfStateOfTheWorldRfqUpdate

export interface QuoteBody {
    id: number
    rfqId: number
    dealerId: number
    state: QuoteState
}

export const PENDING_WITHOUT_PRICE_QUOTE_STATE = "pendingWithoutPrice",
    PENDING_WITH_PRICE_QUOTE_STATE = "pendingWithPrice",
    PASSED_QUOTE_STATE = "passed",
    ACCEPTED_QUOTE_STATE = "accepted",
    REJECTED_WITH_PRICE_QUOTE_STATE = "rejectedWithPrice",
    REJECTED_WITHOUT_PRICE_QUOTE_STATE = "rejectedWithoutPrice"

export type PendingWithoutPriceQuoteState = {
    type: typeof PENDING_WITHOUT_PRICE_QUOTE_STATE
}
export type PendingWithPriceQuoteState = {
    type: typeof PENDING_WITH_PRICE_QUOTE_STATE
    payload: number
}
export type PassedQuoteState = { type: typeof PASSED_QUOTE_STATE }
export type AcceptedQuoteState = {
    type: typeof ACCEPTED_QUOTE_STATE
    payload: number
}
export type RejectedWithPriceQuoteState = {
    type: typeof REJECTED_WITH_PRICE_QUOTE_STATE
    payload: number
}
export type RejectedWithoutPriceQuoteState = {
    type: typeof REJECTED_WITHOUT_PRICE_QUOTE_STATE
}
export type QuoteState =
    | PendingWithoutPriceQuoteState
    | PendingWithPriceQuoteState
    | PassedQuoteState
    | AcceptedQuoteState
    | RejectedWithPriceQuoteState
    | RejectedWithoutPriceQuoteState

export interface RfqBody {
    id: number
    instrumentId: number
    quantity: number
    direction: Direction
    state: RfqState
    expirySecs: number
    creationTimestamp: bigint
}

export enum RfqState {
    Open = "Open",
    Expired = "Expired",
    Cancelled = "Cancelled",
    Closed = "Closed",
}

export const ACK_ACCEPT_QUOTE_RESPONSE = "ack",
    NACK_ACCEPT_QUOTE_RESPONSE = "nack"

export type AckAcceptQuoteResponse = { type: typeof ACK_ACCEPT_QUOTE_RESPONSE }
export type NackAcceptQuoteResponse = {
    type: typeof NACK_ACCEPT_QUOTE_RESPONSE
}
export type AcceptQuoteResponse =
    | AckAcceptQuoteResponse
    | NackAcceptQuoteResponse

export interface AcceptQuoteRequest {
    quoteId: number
}

export const ACK_PASS_RESPONSE = "ack",
    NACK_PASS_RESPONSE = "nack"

export type AckPassResponse = { type: typeof ACK_PASS_RESPONSE }
export type NackPassResponse = { type: typeof NACK_PASS_RESPONSE }
export type PassResponse = AckPassResponse | NackPassResponse
