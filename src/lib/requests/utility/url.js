/*eslint-disable*/

const JAMP_BASE_URL = process.env.REACT_APP_BASE_URL
const ORDER_BASE_URL = process.env.REACT_APP_BASE_URL_ORDER
const GT_BASE_URL = process.env.REACT_APP_BASE_URLGT
const DELIVERY_BASE_URL = process.env.REACT_APP_BASE_URL_DELIVERY

export const urls = {
  STOCK_POINT: {
    INVENTORY_DEPOT_VIEW: `${JAMP_BASE_URL}/batch-inventory`,
    DEPOT_VIEW: `${JAMP_BASE_URL}/depots`,
    DEPOT_DETERMINATION_VIEW: `${JAMP_BASE_URL}/depot-determination`,
    SUPPLIER_CODE_VIEW: `${JAMP_BASE_URL}/supplier-code`,
  },
  CUSTOMER_PO: {
    TRADITIONAL_TRADE_APPROVE: `${GT_BASE_URL}/order/approve`,
  },
  OBD: {
    GET_ITEMS: `${DELIVERY_BASE_URL}/get/obd-fulfillment`,
  },
  BUYER: {
    DISTRIBUTER_VIEW: `${JAMP_BASE_URL}/dbCompanyMaster/distributor`,
  },
  SALES_ORDER: {
    PRIMARY_VIEW: `${ORDER_BASE_URL}/get/order-summary`,
    PRIMARY_ITEMS_VIEW: `${ORDER_BASE_URL}/get/order-fulfillment?javisOrderNumber=`,
  },
  _MISC: {
    TEMPLATE_DOWNLOAD_URL: `${JAMP_BASE_URL}/template/download?fileType=`,
  },
}
