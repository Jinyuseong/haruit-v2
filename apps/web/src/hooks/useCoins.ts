import { useEffect, useState } from "react"

export function useCoins() {
  const [coins, setCoins] = useState(() => Number(localStorage.getItem("coins") || 0))
  useEffect(() => { localStorage.setItem("coins", String(coins)) }, [coins])
  const addCoins = (amount: number) => setCoins(c => c + amount)
  return { coins, addCoins }
}