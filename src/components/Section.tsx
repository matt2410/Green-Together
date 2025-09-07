export default function Section({ title, subtitle, children }:{ title:string, subtitle?:string, children:any }){
  return (
    <section className="card p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
      </div>
      <div>{children}</div>
    </section>
  )
}