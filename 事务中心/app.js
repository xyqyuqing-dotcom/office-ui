(() => {
  const workflowGroups = [
    {
      name: '我的收藏', key: 'favorites', kind: 'blue',
      apps: [
        '公务用车申请', '工卡/电梯卡/人像卡申请', 'yyytest', '客户支出交割货款提前出金申请', '期货程序化报备与外部接口人申请',
        '股票期权程序化报备', '因私出国（境）申请', '立项预算释放申请', '泛微数量'
      ]
    },
    {
      name: '后勤一体化', key: 'logistics', kind: 'blue',
      apps: [
        '博华自行车库申请(旧)', '机动车位申请(旧)', '电子签', '进门/出门单申请(旧)', '外部媒体发声审核(旧)',
        '慰问费', '问卷调查', '公务用车申请', '商务接待申请', '工卡/电梯卡/人像卡申请',
        'yyytest', '空调加时申请', '调阅监控录像申请', '博华自行车库申请', '外部媒体发声审核',
        '机动车位申请'
      ]
    },
    {
      name: '资管综合管理', key: 'asset', kind: 'orange',
      apps: [
        '交易对手入库', '交易对手出库', '新股定价', '交易偏离度较大审批', '投资标的入库',
        '临时开放申购赎回', '关联交易审批', '划款指令(场外)', '划款指令(场内)', '交易指令',
        '产品成立流程', '产品清算流程', '产品开户流程', '管理人准入', '场外基金赎回',
        '固定资产申请', '产品报备', '账户及mac申请流程', '系统产品设置', '产品募集期设定',
        'FOF资产池入池', '场外衍生品交易对手入库', '场外衍生品交易对手出库', '划款指令zero（场外）', '产品合同确认',
        'Mac申请zero1', '产品报备流程zero', 'Mac申请zero2', '场外基金赎回zero2', '场外基金赎回zero'
      ]
    },
    {
      name: '流程中心', key: 'flow-center', kind: 'cyan',
      apps: ['综合部负责人审批', '机构开户中心测试用', '综合部负责人审批（副本）', '机构开户（副本）', '机构开户']
    }
  ];

  const categories = [
    ['我的收藏', 9], ['后勤一体化', 16], ['资管综合管理', 67], ['测试数据11166', 13], ['信息技术事务', 7],
    ['运营中台', 93], ['机构开户', 4], ['国小君工具', 5], ['资金', 1], ['钉钉流程', 6], ['通知中心', 10],
    ['客户IT服务', 12], ['人力资源', 1], ['财务流程', 6], ['预算管理', 12], ['运维工具', 5], ['双端业务', 5],
    ['账户业务', 1], ['双端业务运营中心', 1], ['合规部', 2], ['营业部流程', 31], ['yxl', 2], ['流程中心', 5],
    ['投资部流程', 2], ['新加坡子公司', 12], ['量化交易部', 1], ['蓝凌', 50], ['核心开发', 1], ['蓝鲸2', 24],
    ['测试专用', 1], ['资金业务', 5], ['结算业务', 2], ['yxltest', 2], ['营销管理', 15]
  ];

  const icon = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>';
  const workflowInfo = {
    '空调加时申请': {
      department: '综合管理部',
      businessOwner: '待补充',
      technicalOwner: '待补充',
      description: '用于申请博华办公场地非正常营业时段的空调服务，按实际加时时段提交并完成审批。'
    }
  };

  const reviewer = (id, name, status, time, details = {}) => ({
    id, name, status, time,
    avatarClass: details.avatarClass || 'avatar-generated',
    avatarText: details.avatarText || name.slice(-1),
    auditOpinion: status === 'pending' ? '' : (details.auditOpinion || '')
  });

  const approvalNodes = [
    {
      id: 1, title: '起草', overallStatus: '已提交', processedCount: 1,
      reviewers: [reviewer('draft', '谢雨晴', 'submitted', '10-13 16:55', { avatarClass: 'avatar-she' })]
    },
    {
      id: 2, title: '主管审批', overallStatus: '已通过', processedCount: 2,
      reviewers: [
        reviewer('supervisor-yang', '杨艳英', 'approved', '10-13 16:56', { avatarClass: 'avatar-yang', auditOpinion: '已核对申请时段。' }),
        reviewer('supervisor-02', '审批人02', 'approved', '10-13 16:57', { auditOpinion: '审批通过。' })
      ]
    },
    {
      id: 3, title: '综合部负责人审批', overallStatus: '进行中', processedCount: 3,
      reviewers: [
        reviewer('admin-01', '会签人01', 'approved', '10-13 16:58', { auditOpinion: '已确认申请内容。' }),
        reviewer('admin-02', '会签人02', 'approved', '10-13 16:59'),
        reviewer('admin-03', '会签人03', 'approved', '10-13 17:00'),
        reviewer('admin-04', '会签人04', 'pending', ''),
        reviewer('admin-05', '会签人05', 'pending', '')
      ]
    },
    {
      id: 5, title: '行政盖章', overallStatus: '进行中', processedCount: 20,
      reviewers: Array.from({ length: 24 }, (_, index) => {
        const number = String(index + 1).padStart(2, '0');
        const status = index < 19 ? 'approved' : index === 19 ? 'returned' : 'pending';
        const time = index < 20 ? `10-15 13:${String(38 + index).padStart(2, '0')}` : '';
        return reviewer(`seal-${number}`, `行政会签人${number}`, status, time, {
          avatarText: number,
          auditOpinion: status === 'returned'
            ? '申请材料缺少会签说明，请补充后重新提交。'
            : index === 0 ? '同意的审批意见' : ''
        });
      })
    }
  ];

  const commentRecord = { node: 4, time: '10-15 13:37', author: '杨艳英', text: '1' };
  const coordinatorRecord = { node: 6, title: '协调员办理', time: '10-15 13:58', candidates: 6 };
  const approvalStatus = {
    submitted: { label: '已提交', action: '提交', icon: '✓' },
    approved: { label: '已同意', action: '同意', icon: '✓' },
    rejected: { label: '已拒绝', action: '拒绝', icon: '×' },
    returned: { label: '已退回', action: '退回', icon: '↩' },
    pending: { label: '待处理', action: '待处理', icon: '·' },
    transferred: { label: '已转交', action: '转交', icon: '↗' },
    withdrawn: { label: '已撤回', action: '撤回', icon: '↶' },
    terminated: { label: '已终止', action: '终止', icon: '■' }
  };

  function escapeHtml(value = '') {
    return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  }

  function statusClass(status) {
    return `status-${status}`;
  }

  function reviewerAvatar(person, extraClass = '') {
    const status = statusClass(person.status);
    return `<span class="avatar ${person.avatarClass} ${status} ${extraClass}" aria-hidden="true">${escapeHtml(person.avatarText)}</span>`;
  }

  function renderApprovalRecord(node, person) {
    const state = approvalStatus[person.status] || approvalStatus.pending;
    const note = person.auditOpinion
      ? `<div class="record-note">${escapeHtml(person.auditOpinion)}</div>`
      : '';
    return `<li class="timeline-item ${note ? 'note-item' : ''}" data-kind="approval" data-node="${node.id}" data-time="${escapeHtml(person.time)}">
      <span class="timeline-dot"></span><div class="timeline-copy">
        <div class="step-name">${escapeHtml(node.title)}</div>
        <div class="timeline-row">${reviewerAvatar(person, 'small-avatar')}<div class="actor-block"><span class="actor-name">${escapeHtml(person.name)}</span></div><span class="action-tag ${statusClass(person.status)}">${state.action}</span></div>
        ${person.time ? `<time>${escapeHtml(person.time)}</time>` : ''}${note}
      </div>
    </li>`;
  }

  function renderCommentRecord() {
    return `<li class="timeline-item comment-item note-item" data-kind="comment" data-node="${commentRecord.node}" data-time="${commentRecord.time}">
      <span class="timeline-dot"></span><div class="timeline-copy"><div class="timeline-row">
        <div class="comment-avatar"><svg class="comment-chat-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5 8 8 0 0 1-3.5-.8L4 20l1.2-4A7.5 7.5 0 1 1 20 11.5Z"/><path d="M9 12h.01M12.5 12h.01M16 12h.01"/></svg><span class="comment-node-icon">☏</span></div>
        <div class="actor-block"><span class="actor-name">${commentRecord.author}</span><span class="actor-action">添加评论</span></div>
      </div><time>${commentRecord.time}</time><div class="record-note">${escapeHtml(commentRecord.text)}</div></div>
    </li>`;
  }

  function renderStandaloneComment() {
    return `<h3 class="standalone-comments-title">评论</h3>
      <div class="standalone-comment-entry">
        <div class="standalone-comment-meta">
          <span class="avatar avatar-yang standalone-comment-avatar" aria-hidden="true"></span>
          <span class="standalone-comment-author">${escapeHtml(commentRecord.author)}</span><time>${escapeHtml(commentRecord.time)}</time>
        </div>
        <div class="record-note">${escapeHtml(commentRecord.text)}</div>
      </div>`;
  }

  function renderCoordinatorRecord() {
    return `<li class="timeline-item coordinator-item" data-kind="approval" data-node="${coordinatorRecord.node}" data-time="${coordinatorRecord.time}">
      <span class="timeline-dot"></span><div class="timeline-copy"><div class="step-name">${coordinatorRecord.title}</div>
        <div class="timeline-row"><div class="comment-avatar coordinator-avatar"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 5.5a3 3 0 0 1 0 5.8M18 14a5.5 5.5 0 0 1 3.5 5"/></svg></div>
          <div class="actor-block"><span class="actor-name">${coordinatorRecord.candidates}个候选人 <span class="candidate-chevron">⌄</span></span></div><span class="action-tag status-pending">待认领</span>
        </div><time>${coordinatorRecord.time}</time>
      </div>
    </li>`;
  }

  function renderReviewerDetail(person) {
    if (!person.auditOpinion) return '';
    return `<div class="reviewer-audit-opinion"><strong>审核意见</strong><span>${escapeHtml(person.auditOpinion)}</span></div>`;
  }

  function renderReviewerRow(person, index, autoExpand = false) {
    const state = approvalStatus[person.status] || approvalStatus.pending;
    const canExpand = Boolean(person.auditOpinion) && person.status !== 'pending';
    const defaultOpen = canExpand && (person.status === 'returned' || autoExpand);
    const canToggle = canExpand && !autoExpand;
    const rowTime = person.time ? `<time>${escapeHtml(person.time)}</time>` : '<span class="reviewer-no-time"></span>';
    const rowContent = `${reviewerAvatar(person, 'reviewer-avatar')}<span class="reviewer-name">${escapeHtml(person.name)}</span>
      <span class="reviewer-status ${statusClass(person.status)}"><i>${state.icon}</i>${state.label}</span>${rowTime}<span class="reviewer-chevron ${canToggle ? 'is-toggle' : ''}" ${canToggle ? '' : 'aria-hidden="true"'}>${canToggle ? '⌄' : ''}</span>`;
    return `<li class="reviewer-item ${defaultOpen ? 'detail-open' : ''}" ${index >= 10 ? 'data-overflow="true" hidden' : ''}>
      ${canToggle
        ? `<button class="reviewer-toggle ${defaultOpen ? 'is-open' : ''}" type="button" data-action="toggle-reviewer" data-default-open="${defaultOpen}" aria-expanded="${defaultOpen}">${rowContent}</button>`
        : `<div class="reviewer-line">${rowContent}</div>`}
      ${canExpand && (defaultOpen || canToggle) ? `<div class="reviewer-detail-wrap" ${defaultOpen ? '' : 'hidden'}>${renderReviewerDetail(person)}</div>` : ''}
    </li>`;
  }

  function renderConsensusNode(node) {
    const reviewers = node.reviewers;
    const compact = reviewers.length < 4;
    const processed = node.processedCount ?? reviewers.filter(person => person.status !== 'pending').length;
    const exceptions = reviewers.filter(person => ['returned', 'rejected'].includes(person.status));
    const stateClass = node.overallStatus === '进行中' ? 'in-progress' : 'complete';
    const avatarList = reviewers.slice(0, 5).map(person => `<span class="consensus-avatar ${person.avatarClass}">${escapeHtml(person.avatarText)}</span>`).join('');
    const overflow = reviewers.length > 5 ? `<span class="consensus-avatar-overflow">+${reviewers.length - 5}</span>` : '';
    const alert = exceptions.length
      ? `<div class="consensus-alert"><span aria-hidden="true">!</span>${exceptions.length}人${exceptions.some(person => person.status === 'rejected') ? '拒绝' : '退回'}，请关注</div>`
      : '';
    const rows = reviewers.map((person, index) => renderReviewerRow(person, index, compact)).join('');
    const more = reviewers.length > 10
      ? `<button class="reviewer-more" type="button" data-action="toggle-all-reviewers" aria-expanded="false">查看全部（共${reviewers.length}人）</button>`
      : '';
    return `<li class="timeline-item consensus-item" data-kind="approval" data-node="${node.id}">
      <span class="timeline-dot"></span><div class="timeline-copy"><section class="consensus-node ${compact ? 'compact-consensus' : ''}">
        <div class="consensus-heading"><span class="step-name">${escapeHtml(node.title)}</span><span class="consensus-state ${stateClass}"><i></i>${escapeHtml(node.overallStatus)}</span></div>
        ${compact
          ? `<div class="consensus-details compact-details"><ul class="reviewer-list">${rows}</ul></div>`
          : `<div class="consensus-summary"><span class="consensus-progress">已处理 <strong>${processed}</strong>/${reviewers.length} 人</span><div class="consensus-avatars" aria-label="审批人头像摘要">${avatarList}${overflow}</div></div>
            ${alert}<button class="consensus-toggle" type="button" data-action="toggle-consensus" aria-expanded="false"><span>展开详情</span><span class="consensus-chevron">⌄</span></button>
            <div class="consensus-details" hidden><ul class="reviewer-list">${rows}</ul>${more}</div>`}
      </section></div>
    </li>`;
  }

  function timelineTimeValue(entry) {
    const value = entry.dataset.time || entry.querySelector('time')?.textContent.trim() || '';
    const match = value.match(/(\d{2})-(\d{2})\s+(\d{2}):(\d{2})/);
    if (!match) return Number.MAX_SAFE_INTEGER;
    return new Date(2000, Number(match[1]) - 1, Number(match[2]), Number(match[3]), Number(match[4])).getTime();
  }

  function renderTimeline(mode = 'time') {
    const timeline = document.getElementById('timeline');
    if (!timeline) return;
    const standaloneComments = document.getElementById('standaloneComments');
    const commentFilter = document.querySelector('[data-filter="comment"]');
    const flowPanel = document.getElementById('flowPanel');
    flowPanel?.classList.toggle('order-time', mode === 'time');
    flowPanel?.classList.toggle('order-node', mode === 'node');
    let entries;
    if (mode === 'node') {
      entries = [];
      approvalNodes.forEach(node => {
        if (node.reviewers.length >= 2) entries.push(renderConsensusNode(node));
        else node.reviewers.forEach(person => entries.push(renderApprovalRecord(node, person)));
      });
      entries.push(renderCoordinatorRecord());
      if (standaloneComments) {
        standaloneComments.innerHTML = renderStandaloneComment();
        standaloneComments.hidden = !commentFilter?.checked;
      }
    } else {
      entries = [];
      approvalNodes.forEach(node => node.reviewers.forEach(person => entries.push(renderApprovalRecord(node, person))));
      entries.push(renderCommentRecord(), renderCoordinatorRecord());
      if (standaloneComments) {
        standaloneComments.replaceChildren();
        standaloneComments.hidden = true;
      }
    }
    const ordered = entries.map(markup => {
      const temporary = document.createElement('template');
      temporary.innerHTML = markup.trim();
      return temporary.content.firstElementChild;
    }).sort((a, b) => mode === 'node'
      ? Number(a.dataset.kind === 'comment') - Number(b.dataset.kind === 'comment') || Number(a.dataset.node) - Number(b.dataset.node) || timelineTimeValue(a) - timelineTimeValue(b)
      : timelineTimeValue(a) - timelineTimeValue(b) || Number(a.dataset.node) - Number(b.dataset.node));
    timeline.replaceChildren(...ordered);
    document.querySelectorAll('[data-filter]').forEach(input => {
      timeline.querySelectorAll(`.timeline-item[data-kind="${input.dataset.filter}"]`).forEach(item => { item.hidden = !input.checked; });
    });
  }

  function workflowInfoContent(info) {
    const description = info.description?.trim();
    const descriptionRow = description
      ? `<p class="app-info-description">${description}</p>`
      : '';
    return `
      <div class="app-info-row"><span>归属部门</span><strong>${info.department}</strong></div>
      <div class="app-info-row"><span>业务负责人</span><strong class="info-missing">${info.businessOwner}</strong></div>
      <div class="app-info-row"><span>技术负责人</span><strong class="info-missing">${info.technicalOwner}</strong></div>
      ${descriptionRow}`;
  }

  function toast(message) {
    const element = document.getElementById('toast');
    if (!element) return;
    element.textContent = message;
    element.classList.add('visible');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => element.classList.remove('visible'), 2000);
  }

  function initHome() {
    const rail = document.getElementById('categoryRail');
    const groupsRoot = document.getElementById('workflowGroups');
    if (!rail || !groupsRoot) return;

    rail.innerHTML = categories.map(([name, count], index) => `
      <button class="category-row${index === 1 ? ' active' : ''}" data-category="${name}" type="button">
        <span class="category-icon" aria-hidden="true">▤</span><span class="category-name">${name}</span><span class="category-count">${count}</span>
      </button>`).join('');

    groupsRoot.innerHTML = workflowGroups.map(group => `
      <section class="workflow-group" id="group-${group.key}" data-group="${group.name}">
        <h2 class="group-heading" tabindex="0" role="button" aria-expanded="true"><span>${group.name}</span><span class="chevron">⌄</span></h2>
        <div class="app-grid">${group.apps.map(name => {
          const target = name === '空调加时申请' ? 'application.html' : '#';
          if (name === '空调加时申请') {
            const info = workflowInfo[name];
            return `<div class="app-link ${group.kind} app-link-info" data-name="${name}" data-group="${group.name}">
              <a class="app-link-main" href="${target}"><span class="app-icon">${icon}</span><span class="app-label">${name}</span></a>
              <button class="app-info-trigger" type="button" aria-label="查看${name}信息" aria-controls="airconInfo" aria-expanded="false">i</button>
              <div class="app-info-popover" id="airconInfo" role="tooltip" hidden>${workflowInfoContent(info)}</div>
            </div>`;
          }
          return `<a class="app-link ${group.kind}" href="${target}" data-name="${name}" data-group="${group.name}">
            <span class="app-icon">${icon}</span><span class="app-label">${name}</span>
          </a>`;
        }).join('')}</div>
      </section>`).join('');

    const search = document.getElementById('workflowSearch');
    const empty = document.getElementById('emptyState');
    const applyFilter = () => {
      const query = (search?.value || '').trim().toLocaleLowerCase();
      let total = 0;
      groupsRoot.querySelectorAll('.app-link').forEach(card => {
        const matches = !query || card.dataset.name.toLocaleLowerCase().includes(query) || card.dataset.group.toLocaleLowerCase().includes(query);
        card.hidden = !matches;
        if (matches) total += 1;
      });
      groupsRoot.querySelectorAll('.workflow-group').forEach(group => {
        const hasItems = [...group.querySelectorAll('.app-link')].some(card => !card.hidden);
        group.hidden = !hasItems;
      });
      if (empty) empty.hidden = total > 0;
    };
    search?.addEventListener('input', applyFilter);
    document.getElementById('workflowSearchForm')?.addEventListener('submit', event => {
      event.preventDefault();
      applyFilter();
    });

    groupsRoot.addEventListener('click', event => {
      const heading = event.target.closest('.group-heading');
      if (heading) {
        const group = heading.closest('.workflow-group');
        const collapsed = group.classList.toggle('collapsed');
        heading.setAttribute('aria-expanded', String(!collapsed));
        return;
      }
      const link = event.target.closest('.app-link');
      if (link && link.getAttribute('href') === '#') {
        event.preventDefault();
        toast(`${link.dataset.name} · 页面演示入口`);
      }
    });
    groupsRoot.addEventListener('keydown', event => {
      if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('.group-heading')) {
        event.preventDefault();
        event.target.click();
      }
    });

    const infoCard = groupsRoot.querySelector('.app-link-info');
    const infoTrigger = infoCard?.querySelector('.app-info-trigger');
    const infoPopover = infoCard?.querySelector('.app-info-popover');
    const openInfo = () => {
      if (!infoCard || !infoTrigger || !infoPopover) return;
      infoCard.classList.add('info-open');
      infoPopover.hidden = false;
      infoTrigger.setAttribute('aria-expanded', 'true');
    };
    const closeInfo = () => {
      if (!infoCard || !infoTrigger || !infoPopover) return;
      infoCard.classList.remove('info-open');
      infoPopover.hidden = true;
      infoTrigger.setAttribute('aria-expanded', 'false');
    };
    infoTrigger?.addEventListener('pointerenter', openInfo);
    infoTrigger?.addEventListener('focus', openInfo);
    infoTrigger?.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      openInfo();
    });
    infoCard?.addEventListener('pointerleave', closeInfo);
    infoTrigger?.addEventListener('blur', event => {
      if (!infoCard.contains(event.relatedTarget)) closeInfo();
    });
    document.addEventListener('click', event => {
      if (infoCard && !infoCard.contains(event.target)) closeInfo();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && infoCard?.classList.contains('info-open')) {
        closeInfo();
        infoTrigger?.focus();
      }
    });

    rail.addEventListener('click', event => {
      const item = event.target.closest('.category-row');
      if (!item) return;
      rail.querySelectorAll('.category-row').forEach(row => row.classList.toggle('active', row === item));
      const matching = workflowGroups.find(group => group.name === item.dataset.category);
      if (matching) {
        const section = document.getElementById(`group-${matching.key}`);
        section.hidden = false;
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        toast(`${item.dataset.category}分类暂无演示流程`);
      }
    });

    document.getElementById('permissionToggle')?.addEventListener('change', event => {
      toast(event.target.checked ? '已显示无权限事务' : '已隐藏无权限事务');
    });
    document.querySelectorAll('.mode-item').forEach(item => item.addEventListener('click', () => {
      document.querySelectorAll('.mode-item').forEach(mode => mode.classList.toggle('active', mode === item));
      if (!item.classList.contains('active')) item.classList.add('active');
      if (item.textContent.includes('办理')) toast('办理事务列表仅作界面示意');
    }));
  }

  function initDetail() {
    const workflowIntro = document.getElementById('flowIntroContent');
    const airconInfo = workflowInfo['空调加时申请'];
    if (workflowIntro && airconInfo) workflowIntro.innerHTML = workflowInfoContent(airconInfo);
    renderTimeline('time');

    const introControl = document.getElementById('flowIntroControl');
    const introTrigger = document.getElementById('flowIntroTrigger');
    const introPopover = document.getElementById('flowIntroPopover');
    const closeWorkflowIntro = () => {
      if (!introTrigger || !introPopover) return;
      introPopover.hidden = true;
      introTrigger.setAttribute('aria-expanded', 'false');
    };
    introTrigger?.addEventListener('click', () => {
      if (!introPopover) return;
      const open = introPopover.hidden;
      introPopover.hidden = !open;
      introTrigger.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', event => {
      if (introControl && !introControl.contains(event.target)) closeWorkflowIntro();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && introPopover && !introPopover.hidden) {
        closeWorkflowIntro();
        introTrigger?.focus();
      }
    });

    const reason = document.getElementById('reason');
    const count = document.getElementById('charCount');
    if (reason && count) {
      const updateCount = () => { count.textContent = String(reason.value.length); };
      reason.addEventListener('input', updateCount);
      updateCount();
    }

    const summaryToggle = document.getElementById('summaryToggle');
    const summaryText = document.getElementById('summaryText');
    summaryToggle?.addEventListener('click', () => {
      const expanded = summaryToggle.getAttribute('aria-expanded') !== 'true';
      summaryToggle.setAttribute('aria-expanded', String(expanded));
      summaryText.hidden = !expanded;
      summaryToggle.innerHTML = expanded ? '摘要 <span>⌃</span>' : '摘要 <span>⌄</span>';
    });

    const moreButton = document.getElementById('moreButton');
    const moreMenu = document.getElementById('moreMenu');
    moreButton?.addEventListener('click', () => {
      const open = moreButton.getAttribute('aria-expanded') !== 'true';
      moreButton.setAttribute('aria-expanded', String(open));
      moreMenu.hidden = !open;
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.summary-actions') && moreMenu && moreButton) {
        moreMenu.hidden = true;
        moreButton.setAttribute('aria-expanded', 'false');
      }
    });

    const timeline = document.getElementById('timeline');
    const orderTabs = [...document.querySelectorAll('.order-tabs button[data-order]')];
    orderTabs.forEach(tab => tab.addEventListener('click', () => {
      const mode = tab.dataset.order;
      orderTabs.forEach(item => {
        item.classList.toggle('active', item === tab);
        item.setAttribute('aria-selected', String(item === tab));
      });
      renderTimeline(mode);
    }));
    document.querySelectorAll('[data-filter]').forEach(input => input.addEventListener('change', () => {
      const kind = input.dataset.filter;
      document.querySelectorAll(`.timeline-item[data-kind="${kind}"]`).forEach(item => { item.hidden = !input.checked; });
      if (kind === 'comment') {
        const standaloneComments = document.getElementById('standaloneComments');
        if (standaloneComments && document.getElementById('flowPanel')?.classList.contains('order-node')) {
          standaloneComments.hidden = !input.checked;
        }
      }
    }));

    document.getElementById('collapseFlow')?.addEventListener('click', event => {
      const hidden = document.body.classList.toggle('flow-hidden');
      event.currentTarget.textContent = hidden ? '‹' : '›';
      event.currentTarget.setAttribute('aria-label', hidden ? '展开流程记录' : '折叠流程记录');
    });

    timeline?.addEventListener('click', event => {
      const reviewerToggle = event.target.closest('[data-action="toggle-reviewer"]');
      if (reviewerToggle) {
        const reviewerRow = reviewerToggle.closest('.reviewer-item');
        const shouldOpen = reviewerToggle.getAttribute('aria-expanded') !== 'true';
        timeline.querySelectorAll('.reviewer-item').forEach(item => {
          item.classList.remove('detail-open');
          const toggle = item.querySelector('.reviewer-toggle');
          toggle?.setAttribute('aria-expanded', 'false');
          toggle?.classList.remove('is-open');
          const detail = item.querySelector('.reviewer-detail-wrap');
          if (detail) detail.hidden = true;
        });
        if (shouldOpen && reviewerRow) {
          reviewerRow.classList.add('detail-open');
          reviewerToggle.setAttribute('aria-expanded', 'true');
          reviewerToggle.classList.add('is-open');
          reviewerRow.querySelector('.reviewer-detail-wrap').hidden = false;
        }
        return;
      }

      const moreToggle = event.target.closest('[data-action="toggle-all-reviewers"]');
      if (moreToggle) {
        const group = moreToggle.closest('.consensus-node');
        const showAll = moreToggle.getAttribute('aria-expanded') !== 'true';
        group.classList.toggle('show-all', showAll);
        moreToggle.setAttribute('aria-expanded', String(showAll));
        moreToggle.textContent = showAll ? '收起至前10人' : '查看全部（共' + group.querySelectorAll('.reviewer-item').length + '人）';
        group.querySelectorAll('[data-overflow]').forEach(item => { item.hidden = !showAll; });
        return;
      }

      const consensusToggle = event.target.closest('[data-action="toggle-consensus"]');
      if (consensusToggle) {
        const group = consensusToggle.closest('.consensus-node');
        const details = group.querySelector('.consensus-details');
        const open = details.hidden;
        details.hidden = !open;
        group.classList.toggle('consensus-open', open);
        consensusToggle.setAttribute('aria-expanded', String(open));
        consensusToggle.querySelector('span:first-child').textContent = open ? '收起详情' : '展开详情';
        if (!open) {
          group.classList.remove('show-all');
          const moreButton = group.querySelector('.reviewer-more');
          if (moreButton) {
            moreButton.setAttribute('aria-expanded', 'false');
            moreButton.textContent = '查看全部（共' + group.querySelectorAll('.reviewer-item').length + '人）';
          }
          group.querySelectorAll('[data-overflow]').forEach(item => { item.hidden = true; });
          group.querySelectorAll('.reviewer-item').forEach(item => {
            const toggle = item.querySelector('.reviewer-toggle');
            const defaultOpen = toggle?.dataset.defaultOpen === 'true';
            item.classList.toggle('detail-open', defaultOpen);
            if (toggle) toggle.setAttribute('aria-expanded', String(defaultOpen));
            toggle?.classList.toggle('is-open', defaultOpen);
            const detail = item.querySelector('.reviewer-detail-wrap');
            if (detail) detail.hidden = !defaultOpen;
          });
        }
      }
    });

    const backdrop = document.getElementById('modalBackdrop');
    function closeModal() {
      if (!backdrop) return;
      backdrop.hidden = true;
      backdrop.querySelectorAll('.dialog').forEach(dialog => { dialog.hidden = true; });
    }
    document.querySelectorAll('[data-modal]').forEach(button => button.addEventListener('click', () => {
      const dialog = document.getElementById(button.dataset.modal);
      if (!dialog || !backdrop) return;
      backdrop.hidden = false;
      backdrop.querySelectorAll('.dialog').forEach(item => { item.hidden = item !== dialog; });
    }));
    document.querySelectorAll('.dialog-close,.dialog-cancel').forEach(button => button.addEventListener('click', closeModal));
    backdrop?.addEventListener('click', event => { if (event.target === backdrop) closeModal(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });

    document.querySelectorAll('[data-toast]').forEach(button => button.addEventListener('click', () => {
      toast(button.dataset.toast);
      if (button.closest('.dialog')) closeModal();
    }));
  }

  initHome();
  initDetail();
})();
