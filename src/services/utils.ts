import { get } from "lodash"

export const utils = {
  wrapResponse: (raw) => {
    const status = get(raw, "status", 500)
    switch (status) {
      case 200:
      case 201:
        return {
          isError: false,
          data: get(raw, ["data", "data"]),
        }
      default:
        return {
          isError: true,
          message: "Unrecognize response",
        }
    }
  },
}
