export const STATUS = {
	CREATED: 0,
	ACCEPTING: 1,
	CLOSED: 2,
}

export const BENEFICIARIESGIVEAWAYSTATUS ={
  PENDING: 0,
  PAID: 1,
  ERROR: 2,
  CANCELLED: 3,
}

export const sortDate = (a, b) => {
   return new Date(b.createdAt) > new Date(a.createdAt)
}