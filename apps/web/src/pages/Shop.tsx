export default function Shop() {
  const items = [
    { id:'theme-pastel',  name:'파스텔 테마',   price:50,  tag:'테마' },
    { id:'bg-sunrise',    name:'배경: 선라이즈', price:30,  tag:'배경' },
    { id:'sticker-star',  name:'스티커: 별',     price:20,  tag:'스티커' },
    { id:'theme-dark',    name:'다크 테마',      price:50,  tag:'테마' },
  ]

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">상점</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {items.map(it => (
          <div key={it.id} className="card bg-base-100 shadow-md rounded-2xl">
            <div className="card-body p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{it.name}</h3>
                <span className="badge">{it.tag}</span>
              </div>
              <div className="mt-2 text-sm text-base-content/70">{it.price} 코인</div>
              <button className="btn btn-primary btn-sm mt-3">구매</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}