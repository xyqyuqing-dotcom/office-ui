(()=>{
  const query=new URLSearchParams(location.search);
  const home=new URL('talent-evaluation-demo.html',document.currentScript.src).href;
  const respond=()=>{if(window.parent!==window && query.has('evaluationSnapshot') && typeof window.personEvaluationSnapshot==='function')window.parent.postMessage({type:'person-evaluation-snapshot',snapshot:window.personEvaluationSnapshot()},'*')};
  window.addEventListener('message',event=>{if(event.source===window.parent && event.data?.type==='person-evaluation-request')respond()});
  respond();
  const sample=(window.PersonEvaluationExamples||[]).find(record=>record.id===query.get('evaluationExample'));
  if(sample){
    const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
    const cover=document.createElement('div');cover.style.cssText='position:fixed;inset:0;z-index:100;background:#24374d66;display:grid;place-items:center;padding:20px';
    const stars=value=>Array.from({length:5},(_,index)=>'<span aria-hidden="true" style="font-size:18px;color:transparent;background:linear-gradient(90deg,#e7ad43 '+Math.max(0,Math.min(100,(value-index)*100))+'%,#e0e6ee '+Math.max(0,Math.min(100,(value-index)*100))+'%);background-clip:text;-webkit-background-clip:text">★</span>').join('');
    const dimensions={mentor:['专业胜任力','工作积极性','文化认同感'],employee:['带教投入','带教方法','带教成效']};
    const direction=(key,title)=>'<section style="padding:18px;border:1px solid #e4eaf2;border-radius:8px;margin-top:14px"><h3 style="margin:0 0 14px;font-size:16px">'+escape(title)+'</h3>'+dimensions[key].map((name,index)=>'<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #edf0f4">'+name+'<span style="color:#b68a43">★ '+sample[key+'Scores'][index].toFixed(1)+' / 5</span></div>').join('')+'<p style="white-space:pre-wrap;line-height:1.8;color:#62748b">'+escape(sample[key+'Comment'])+'</p></section>';
    cover.innerHTML='<section role="dialog" aria-modal="true" aria-label="来源示例详情" style="width:min(960px,100%);max-height:calc(100dvh - 40px);overflow:auto;background:white;border-radius:12px;padding:24px;font:14px Microsoft YaHei;color:#34465a"><h2 style="margin:0;font-size:21px">'+escape(sample.source)+' · 完整双向评价示例</h2><p style="color:#8996a7">'+escape(sample.employee.name)+' ｜ '+escape(sample.teacher.name)+' ｜ '+escape(sample.period)+'</p><p style="color:#8996a7">'+escape(sample.department)+' · 评价日期 '+escape(sample.date)+'</p>'+direction('mentor',sample.teacher.name+' 评价 '+sample.employee.name)+direction('employee',sample.employee.name+' 评价 '+sample.teacher.name)+'<div style="margin-top:20px"><a href="'+home+'" style="color:#2878e5;text-decoration:none">‹ 返回人员评价</a></div></section>';
    document.body.append(cover);
  }
  if(query.get('from')==='evaluation' && !sample){
    const back=document.createElement('a');back.href=home;back.textContent='‹ 返回人员评价';back.style.cssText='position:fixed;bottom:18px;left:20px;z-index:90;background:white;color:#2878e5;border:1px solid #c8d9f0;border-radius:7px;padding:10px 14px;text-decoration:none;font:14px Microsoft YaHei';document.body.append(back);
  }
})();
