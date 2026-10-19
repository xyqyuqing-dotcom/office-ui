(()=>{
'use strict';
const $=id=>document.getElementById(id),escape=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const dimensions={mentor:['专业胜任力','工作积极性','文化认同感'],employee:['带教投入','带教方法','带教成效']};
const sourceFiles={rotation:'rotation-log-demo.html',probation:'probation-review-flow.html',review:'new-employee-review.html'};
const snapshots={},frames={},loaded=new Set();let pairs=[],people=new Map(),currentPerson='',currentRole='employee',returnFocus=null,timeout;
const scores=values=>Array.from({length:3},(_,index)=>{const value=Number(values?.[index]||0);return Number.isFinite(value)&&value>0&&value<=5?value:0});
const average=values=>{const scored=values.filter(value=>value>0);return scored.length?(scored.reduce((sum,value)=>sum+value,0)/scored.length).toFixed(1):null};
const person=(name,department='',position='')=>({name,department,position});
function buildData(){
 pairs=[];people=new Map();let missing=0;
 for(const record of snapshots.rotation?.records||[]){
  if(String(record.id).startsWith('draft-'))continue;
  const mentors=record.mentors||[record.mentor].filter(Boolean);
  mentors.forEach((name,index)=>{const evaluation=record.mentorEvaluations?.[name]||(index===0?{ratings:record.ratings,evaluationNotes:record.evaluationNotes}:{});
   pairs.push({id:record.id+'|'+name,employee:person(record.name,record.department,record.position),teacher:person(name,record.rotationDepartment),teacherRole:'轮岗带教老师',source:'轮岗日志',period:record.periodStart+' 至 '+record.periodEnd,date:record.updatedAt||record.periodEnd,mentorDate:evaluation.savedAt?.mentor||record.updatedAt||'',employeeDate:evaluation.savedAt?.employee||record.updatedAt||'',department:record.rotationDepartment,mentorScores:scores(evaluation.ratings?.mentor),employeeScores:scores(evaluation.ratings?.employee),mentorComment:evaluation.evaluationNotes?.mentor||'',employeeComment:evaluation.evaluationNotes?.employee||'',url:sourceFiles.rotation+'?from=evaluation&record='+encodeURIComponent(record.id)+'&teacher='+encodeURIComponent(name)});
  });
 }
 for(const kind of ['probation','review']){
  const snapshot=snapshots[kind];if(!snapshot)continue;const saved=snapshot.saved||{},meta=saved.meta||{},employee=meta.employee||snapshot.employee,teacher=meta.teacher||{};
  const mentorValues=kind==='probation'?saved.ratings:saved.ratings?.mentor,employeeValues=kind==='review'?(Array.isArray(saved.ratings)?saved.ratings:saved.ratings?.employee):[];
  const pair={id:meta.id||(kind==='probation'?'probation-zhang-anqi':'review-yang-yanying-6'),employee,teacher:person(teacher.name||'',teacher.department||''),teacherRole:'指导老师',source:kind==='probation'?'转正流程':'述职第六期',period:meta.period||(kind==='probation'?'转正评价':'第6期述职'),date:meta.date||'',mentorDate:saved.savedAt?.mentor??meta.date??'',employeeDate:saved.savedAt?.employee??meta.date??'',department:employee.department||'',mentorScores:scores(mentorValues),employeeScores:scores(employeeValues),mentorComment:kind==='probation'?saved.comment||'':saved.evaluationNotes?.mentor||'',employeeComment:kind==='review'?saved.evaluationNotes?.employee||saved.comment||'':'',url:sourceFiles[kind]+'?from=evaluation&focus=mentor'+(kind==='review'?'&period=6':'')};
  if(!pair.teacher.name&&(average(pair.mentorScores)||average(pair.employeeScores)||pair.mentorComment||pair.employeeComment))missing++;
  pairs.push(pair);
 }
 for(const sample of window.PersonEvaluationExamples||[]){if(!pairs.some(pair=>pair.id===sample.id))pairs.push(structuredClone(sample))}
 const ensure=(value,role)=>{if(!value?.name)return;let entry=people.get(value.name);if(!entry){entry={name:value.name,departments:new Set(),positions:new Set(),roles:new Set(),edges:[]};people.set(value.name,entry)}if(value.department)entry.departments.add(value.department);if(value.position)entry.positions.add(value.position);entry.roles.add(role);return entry};
 pairs.forEach(pair=>{
  const employee=ensure(pair.employee,'员工'),teacher=ensure(pair.teacher,pair.teacherRole);
  if(employee)employee.edges.push({pair,role:'employee',evaluator:pair.teacher.name||'指导老师（姓名未补齐）',values:pair.mentorScores,comment:pair.mentorComment,direction:'mentor',date:pair.mentorDate??pair.date});
  if(teacher)teacher.edges.push({pair,role:'teacher',evaluator:pair.employee.name,values:pair.employeeScores,comment:pair.employeeComment,direction:'employee',date:pair.employeeDate??pair.date});
 });
 $('dataWarning').hidden=!missing;$('dataWarning').textContent=missing+' 条流程评价缺少指导老师姓名，已保留来源记录。请到来源选择指导老师并重新保存，补齐老师身份。';
 const names=Array.from(people.keys()).sort((a,b)=>a.localeCompare(b,'zh-CN'));
 $('subjectOptions').innerHTML=names.map(name=>'<option value="'+escape(name)+'"></option>').join('');
 const evaluators=Array.from(new Set(Array.from(people.values()).flatMap(entry=>entry.edges.map(edge=>edge.evaluator)))).sort((a,b)=>a.localeCompare(b,'zh-CN'));
 $('evaluatorOptions').innerHTML=evaluators.map(name=>'<option value="'+escape(name)+'"></option>').join('');
 const selected=$('departmentFilter').value;const departments=Array.from(new Set(Array.from(people.values()).flatMap(entry=>Array.from(entry.departments)))).sort((a,b)=>a.localeCompare(b,'zh-CN'));
 $('departmentFilter').innerHTML='<option value="">全部部门</option>'+departments.map(name=>'<option>'+escape(name)+'</option>').join('');$('departmentFilter').value=selected;
 render();
}
function filterState(){return {subject:$('subjectFilter').value.trim(),evaluator:$('evaluatorFilter').value.trim(),department:$('departmentFilter').value,source:$('sourceFilter').value,start:$('startFilter').value,end:$('endFilter').value}}
function matchingEdges(entry){const f=filterState();if(f.subject&&!entry.name.includes(f.subject))return [];if(f.department&&!entry.departments.has(f.department))return [];return entry.edges.filter(edge=>(!f.evaluator||edge.evaluator.includes(f.evaluator))&&(!f.source||edge.pair.source===f.source)&&(!(f.start||f.end)||Boolean(edge.date))&&(!f.start||edge.date>=f.start)&&(!f.end||edge.date<=f.end))}
function metric(edges,role){const all=edges.filter(edge=>edge.role===role);return all.length?'<span class="metric">'+all.filter(edge=>average(edge.values)).length+'</span><small>/ '+all.length+' 条</small>':'—'}
function render(){
 const rows=Array.from(people.values()).map(entry=>({entry,edges:matchingEdges(entry)})).filter(row=>row.edges.length).sort((a,b)=>a.entry.name.localeCompare(b.entry.name,'zh-CN'));
 $('personCount').textContent='共 '+rows.length+' 人';
 $('peopleRows').innerHTML=rows.map(({entry,edges})=>'<tr><td><button class="name-button" data-person="'+escape(entry.name)+'">'+escape(entry.name)+'</button>'+'</td><td>'+escape(Array.from(entry.departments).join('、')||'未提供')+'</td><td>'+escape(Array.from(entry.positions).join('、')||'未提供')+'</td><td><div class="role-tags">'+Array.from(new Set(edges.map(edge=>edge.role==='employee'?'员工':edge.pair.teacherRole))).map(role=>'<span class="evaluation-tag '+(role==='员工'?'employee':role==='指导老师'?'guide':'')+'">'+role+'</span>').join('')+'</div></td><td>'+metric(edges,'employee')+'</td><td>'+metric(edges,'teacher')+'</td><td><button class="text-button" data-person="'+escape(entry.name)+'">详情</button></td></tr>').join('')||'<tr><td colspan="7" class="evaluation-empty">没有匹配的人员，请调整筛选条件。</td></tr>';
 if(currentPerson&&!$('personDialog').hidden)renderDetail();
}
function starScore(value){
 if(!value)return '<span class="evaluation-star-number">未评分</span>';
 const score=Number(value),stars=Array.from({length:5},(_,index)=>'<span class="evaluation-star" style="--fill:'+Math.max(0,Math.min(100,(score-index)*100))+'%" aria-hidden="true">★</span>').join('');
 return '<span class="evaluation-star-score"><span class="evaluation-stars" role="img" aria-label="'+score.toFixed(1)+'分，满分5分">'+stars+'</span><span class="evaluation-star-number">'+score.toFixed(1)+' / 5</span></span>';
}
function dimensionHtml(values,direction){return '<div class="evaluation-dimension-list">'+dimensions[direction].map((name,index)=>'<div class="evaluation-dimension"><span>'+name+'</span>'+starScore(values[index])+'</div>').join('')+'</div>'}
function entryHtml(edge){
 const p=edge.pair,avg=average(edge.values);
 const teacherTag='<span class="evaluation-tag '+(p.teacherRole==='指导老师'?'guide':'')+'">'+escape(p.teacherRole)+'</span>';
 const evaluatorTag=edge.role==='employee'?' '+teacherTag:'';
 const subjectRole=edge.role==='teacher'?'<div class="evaluation-subject-role"><span>被评价身份：</span>'+teacherTag+'</div>':'';
 return '<article class="evaluation-entry"><div class="evaluation-entry-head"><div><span class="evaluation-entry-name">评价人：'+escape(edge.evaluator)+'</span>'+evaluatorTag+'<div class="evaluation-entry-meta"><span>'+escape(p.department||'部门未提供')+'</span><span>'+escape(p.period)+'</span><span>'+escape(p.source)+'</span><span>'+escape(edge.date||'评价时间未提供')+'</span></div></div><div class="evaluation-entry-aside">'+subjectRole+'<div class="evaluation-entry-score">'+(avg?'<span>评价均分</span>'+starScore(avg):'暂无评分')+'</div></div></div><div class="evaluation-entry-body">'+dimensionHtml(edge.values,edge.direction)+'<p class="evaluation-comment">'+escape(edge.comment||'暂无文字评价')+'</p></div><div class="evaluation-entry-foot"><a href="'+escape(p.url)+'">查看来源 ↗</a></div></article>';
}
function renderDetail(){
 const entry=people.get(currentPerson);if(!entry)return;const edges=matchingEdges(entry),f=filterState();
 $('personTitle').textContent=entry.name+' · 人员评价';$('personMeta').textContent=[Array.from(entry.departments).join('、')||'部门未提供',Array.from(entry.positions).join('、')].filter(Boolean).join(' ｜ ');
 const labels=[f.subject&&'被评价人：'+f.subject,f.evaluator&&'评价人：'+f.evaluator,f.department&&'部门：'+f.department,f.source&&'来源：'+f.source,f.start&&'从 '+f.start,f.end&&'至 '+f.end].filter(Boolean);
 $('personTabs').innerHTML=[['employee','作为员工'],['teacher','作为老师']].map(([role,label])=>'<button class="evaluation-person-tab '+(currentRole===role?'active':'')+'" id="personTab-'+role+'" role="tab" data-person-role="'+role+'" aria-selected="'+(currentRole===role)+'" tabindex="'+(currentRole===role?'0':'-1')+'" aria-controls="personContent">'+label+'<small>'+edges.filter(edge=>edge.role===role).length+'</small></button>').join('');
 $('personContent').setAttribute('aria-labelledby','personTab-'+currentRole);
 const selected=edges.filter(edge=>edge.role===currentRole).sort((a,b)=>String(b.date).localeCompare(String(a.date)));
 $('personContent').innerHTML=(labels.length?'<div class="evaluation-scope"><span>当前筛选 · '+escape(labels.join(' ｜ '))+'</span><button class="text-button" id="clearDetailFilters">清除筛选，查看全部</button></div>':'')+(selected.map(entryHtml).join('')||'<div class="evaluation-empty">'+(labels.length?'当前筛选条件下暂无评价':'暂无此身份的评价记录')+'</div>');
}
function openPerson(name,trigger){currentPerson=name;const matched=matchingEdges(people.get(name));currentRole=matched.some(edge=>edge.role==='employee')?'employee':'teacher';returnFocus=trigger;$('personDialog').hidden=false;document.body.classList.add('evaluation-open');document.querySelector('main').inert=true;renderDetail();$('closePerson').focus()}
function closePerson(){$('personDialog').hidden=true;document.body.classList.remove('evaluation-open');document.querySelector('main').inert=false;currentPerson='';const button=Array.from(document.querySelectorAll('[data-person]')).find(node=>node.dataset.person===returnFocus?.dataset.person);(button||returnFocus)?.focus()}
function clearFilters(){['subjectFilter','evaluatorFilter','departmentFilter','sourceFilter','startFilter','endFilter'].forEach(id=>$(id).value='');render()}
function refresh(){loaded.clear();$('loadStatus').textContent='读取评价中…';for(const [kind,file] of Object.entries(sourceFiles)){let frame=frames[kind];if(!frame){frame=document.createElement('iframe');frame.className='evaluation-source-frame';frame.title='评价来源 '+kind;frames[kind]=frame;document.body.append(frame)}frame.onload=()=>frame.contentWindow.postMessage({type:'person-evaluation-request'},'*');frame.src=file+'?evaluationSnapshot=1&refresh='+Date.now()}clearTimeout(timeout);timeout=setTimeout(()=>{if(loaded.size<3)$('loadStatus').textContent='部分来源未读取，可点击刷新重试'},5000)}
window.addEventListener('message',event=>{if(event.data?.type!=='person-evaluation-snapshot')return;const kind=Object.keys(frames).find(key=>frames[key].contentWindow===event.source);if(!kind||event.data.snapshot?.kind!==kind)return;snapshots[kind]=event.data.snapshot;loaded.add(kind);buildData();if(loaded.size===3){clearTimeout(timeout);$('loadStatus').textContent='已读取全部来源'}});
window.addEventListener('focus',()=>{Object.values(frames).forEach(frame=>frame.contentWindow?.postMessage({type:'person-evaluation-request'},'*'))});
for(const id of ['subjectFilter','evaluatorFilter','departmentFilter','sourceFilter','startFilter','endFilter'])$(id).addEventListener('input',render);
$('clearFilters').onclick=clearFilters;$('refreshEvaluation').onclick=refresh;$('peopleRows').onclick=event=>{const button=event.target.closest('[data-person]');if(button)openPerson(button.dataset.person,button)};
$('personTabs').onclick=event=>{const tab=event.target.closest('[data-person-role]');if(!tab)return;currentRole=tab.dataset.personRole;renderDetail();$('personContent').scrollTop=0;$('personTab-'+currentRole).focus()};
$('personTabs').onkeydown=event=>{if(['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();currentRole=currentRole==='employee'?'teacher':'employee';renderDetail();$('personContent').scrollTop=0;$('personTab-'+currentRole).focus()}};
$('personContent').onclick=event=>{if(event.target.closest('#clearDetailFilters'))clearFilters()};$('closePerson').onclick=closePerson;$('closePersonFoot').onclick=closePerson;
$('personDialog').onclick=event=>{if(event.target===$('personDialog'))closePerson()};document.addEventListener('keydown',event=>{if($('personDialog').hidden)return;if(event.key==='Escape')closePerson();if(event.key==='Tab'){const nodes=Array.from($('personDialog').querySelectorAll('button,a,summary,input,select')).filter(node=>node.getClientRects().length);const first=nodes[0],last=nodes.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}});
$('toggleMenu').onclick=()=>document.body.classList.toggle('menu-collapsed');refresh();
})();
