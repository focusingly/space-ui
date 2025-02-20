import { defineStore } from "pinia";
import { StoreID } from "./store-id";

export const useTokenStore = defineStore(StoreID.TokenStore, {
  state() {
    return {
      token: ""
    };
  },
  getters: {
    valid(ctx) {
      return ctx.token.trim() !== "";
    }
  }
});
