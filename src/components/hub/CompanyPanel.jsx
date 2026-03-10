import { C } from '../../constants/tokens.js'
import { COMPANY_STATS } from '../../constants/data.js'
import { SectionTitle } from '../layout/Atoms.jsx'

export default function CompanyPanel() {
  return (
    <div className="anim-up2">
      <SectionTitle>🏢 Empresa · hoy</SectionTitle>
      <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:8}}>
        {COMPANY_STATS.map((item,i) => (
          <div key={i}
            className="card-hover"
            style={{
              background:C.white,
              border:`1.5px solid ${item.color}18`,
              borderRadius:12,
              padding:12,
              cursor:'pointer',
              animation:`fadeUp .25s ${i*.05}s ease both`,
            }}
          >
            <p style={{fontSize:26,fontWeight:800,color:item.color,lineHeight:1}}>{item.val}</p>
            <p style={{fontSize:11,fontWeight:700,color:'#334155',marginTop:3}}>{item.label}</p>
            <p style={{fontSize:10,color:C.gray400,marginTop:2,lineHeight:1.3}}>{item.sub}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
