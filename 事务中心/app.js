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
      id: 1, title: '起草', processedCount: 1,
      reviewers: [reviewer('draft', '谢雨晴', 'submitted', '10-13 16:55', { avatarClass: 'avatar-she' })]
    },
    {
      id: 2, title: '主管审批', processedCount: 2,
      reviewers: [
        reviewer('supervisor-yang', '杨艳英', 'approved', '10-13 16:56', { avatarClass: 'avatar-yang', auditOpinion: '已核对申请时段。' }),
        reviewer('supervisor-02', '审批人02', 'approved', '10-13 16:57', { auditOpinion: '审批通过。' })
      ]
    },
    {
      id: 3, title: '综合部负责人审批', processedCount: 3,
      reviewers: [
        reviewer('admin-01', '会签人01', 'approved', '10-13 16:58', { auditOpinion: '已确认申请内容。' }),
        reviewer('admin-02', '会签人02', 'approved', '10-13 16:59'),
        reviewer('admin-03', '会签人03', 'approved', '10-13 17:00'),
        reviewer('admin-04', '会签人04', 'pending', ''),
        reviewer('admin-05', '会签人05', 'pending', '')
      ]
    },
    {
      id: 5, title: '行政盖章', processedCount: 20,
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

  function renderReviewerRow(person, index) {
    const state = approvalStatus[person.status] || approvalStatus.pending;
    const canExpand = Boolean(person.auditOpinion) && person.status !== 'pending';
    const defaultOpen = canExpand;
    const canToggle = canExpand;
    const detailId = `reviewer-opinion-${person.id}`;
    const rowTime = person.time ? `<time>${escapeHtml(person.time)}</time>` : '<span class="reviewer-no-time"></span>';
    const rowContent = `${reviewerAvatar(person, 'reviewer-avatar')}<span class="reviewer-name">${escapeHtml(person.name)}</span>
      <span class="reviewer-status ${statusClass(person.status)}"><i>${state.icon}</i>${state.label}</span>${rowTime}<span class="reviewer-chevron ${canToggle ? 'is-toggle' : ''}" ${canToggle ? '' : 'aria-hidden="true"'}>${canToggle ? '⌄' : ''}</span>`;
    return `<li class="reviewer-item ${defaultOpen ? 'detail-open' : ''}" ${index >= 10 ? 'data-overflow="true" hidden' : ''}>
      ${canToggle
        ? `<button class="reviewer-toggle ${defaultOpen ? 'is-open' : ''}" type="button" data-action="toggle-reviewer" aria-expanded="${defaultOpen}" aria-controls="${detailId}">${rowContent}</button>`
        : `<div class="reviewer-line">${rowContent}</div>`}
      ${canExpand ? `<div class="reviewer-detail-wrap" id="${detailId}">${renderReviewerDetail(person)}</div>` : ''}
    </li>`;
  }

  function renderConsensusNode(node) {
    const reviewers = node.reviewers;
    const compact = reviewers.length < 4;
    const processed = node.processedCount ?? reviewers.filter(person => person.status !== 'pending').length;
    const exceptions = reviewers.filter(person => ['returned', 'rejected'].includes(person.status));
    const avatarList = reviewers.slice(0, 5).map(person => `<span class="consensus-avatar ${person.avatarClass}">${escapeHtml(person.avatarText)}</span>`).join('');
    const overflow = reviewers.length > 5 ? `<span class="consensus-avatar-overflow">+${reviewers.length - 5}</span>` : '';
    const alert = exceptions.length
      ? `<div class="consensus-alert"><span aria-hidden="true">!</span>${exceptions.length}人${exceptions.some(person => person.status === 'rejected') ? '拒绝' : '退回'}，请关注</div>`
      : '';
    const rows = reviewers.map((person, index) => renderReviewerRow(person, index)).join('');
    const more = reviewers.length > 10
      ? `<button class="reviewer-more" type="button" data-action="toggle-all-reviewers" aria-expanded="false">查看全部（共${reviewers.length}人）</button>`
      : '';
    return `<li class="timeline-item consensus-item" data-kind="approval" data-node="${node.id}">
      <span class="timeline-dot"></span><div class="timeline-copy"><section class="consensus-node ${compact ? 'compact-consensus' : ''}">
        <div class="consensus-heading"><span class="step-name">${escapeHtml(node.title)}</span></div>
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
    const mobileHome = window.matchMedia('(max-width: 650px)');

    const favoritesKey = 'office-workflow-favorites-v1';
    const favoriteGroup = workflowGroups.find(group => group.key === 'favorites');
    let favorites = new Set(favoriteGroup.apps);
    try {
      const saved = JSON.parse(localStorage.getItem(favoritesKey));
      if (Array.isArray(saved) && saved.every(name => typeof name === 'string')) favorites = new Set(saved);
    } catch { /* Keep the sample favorites when browser storage is unavailable. */ }
    favoriteGroup.apps = [...favorites];

    rail.innerHTML = categories.map(([name, count], index) => `
      <button class="category-row${index === (mobileHome.matches ? 0 : 1) ? ' active' : ''}" data-category="${name}" type="button">
        <span class="category-icon" aria-hidden="true">▤</span><span class="category-name">${name}</span><span class="category-count">${count}</span>
      </button>`).join('');

    const renderCard = (name, group) => {
      const label = escapeHtml(name);
      const infoButton = workflowInfo[name]
        ? `<button class="app-info-trigger" type="button" aria-label="查看${label}详情" aria-expanded="false" aria-controls="homeWorkflowInfo"><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7.2"/><path d="M10 9v5M10 6v.2"/></svg></button>`
        : '';
      const saved = favorites.has(name);
      return `<div class="app-link ${group.kind}" data-name="${label}" data-group="${escapeHtml(group.name)}">
        <span class="app-icon">${icon}</span>
        <div class="app-copy app-card-content"><div class="app-name-row"><a class="app-link-main" href="${name === '空调加时申请' ? 'application.html' : '#'}"><span class="app-label" title="${label}">${label}</span></a>${infoButton}</div>${workflowInfo[name]?.description?.trim() ? `<span class="app-description">${escapeHtml(workflowInfo[name].description)}</span>` : ''}</div>
        <button class="app-favorite${saved ? ' is-favorite' : ''}" type="button" aria-label="${saved ? '取消收藏' : '收藏'}${label}" aria-pressed="${saved}" title="${saved ? '取消收藏' : '收藏'}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.8 5.7 6.3.9-4.55 4.43 1.07 6.27L12 17.34l-5.62 2.96 1.07-6.27L2.9 9.6l6.3-.9Z"/></svg></button>
      </div>`;
    };
    groupsRoot.innerHTML = workflowGroups.map(group => `
      <section class="workflow-group" id="group-${group.key}" data-group="${group.name}">
        <h2 class="group-heading" tabindex="0" role="button" aria-expanded="true"><span>${group.name}</span><span class="chevron">⌄</span><span class="group-count">${group.apps.length}</span></h2>
        <div class="app-grid">${group.apps.map(name => renderCard(name, group)).join('')}</div>
        ${group.key === 'favorites' ? '<p class="favorites-empty" hidden>点击流程右侧的星标，添加常用事务</p>' : ''}
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
      const favoritesSection = document.getElementById('group-favorites');
      if (!query && favorites.size === 0) {
        favoritesSection.hidden = false;
        favoritesSection.querySelector('.favorites-empty').hidden = false;
      } else {
        favoritesSection.querySelector('.favorites-empty').hidden = true;
      }
      if (empty) empty.hidden = total > 0 || (!query && favorites.size === 0);
      closeInfo();
    };
    search?.addEventListener('input', applyFilter);
    document.getElementById('workflowSearchForm')?.addEventListener('submit', event => {
      event.preventDefault();
      applyFilter();
    });

    groupsRoot.addEventListener('click', event => {
      const favoriteButton = event.target.closest('.app-favorite');
      if (favoriteButton) {
        const name = favoriteButton.closest('.app-link').dataset.name;
        const saved = !favorites.has(name);
        if (saved) favorites.add(name); else favorites.delete(name);
        try { localStorage.setItem(favoritesKey, JSON.stringify([...favorites])); } catch { /* Changes remain available for this visit. */ }
        favoriteGroup.apps = [...favorites];
        closeInfo();
        // Update matching cards in place so keyboard focus stays on the control.
        groupsRoot.querySelectorAll('.app-link').forEach(card => {
          if (card.dataset.name !== name) return;
          const button = card.querySelector('.app-favorite');
          button.classList.toggle('is-favorite', saved);
          button.setAttribute('aria-pressed', String(saved));
          button.setAttribute('aria-label', `${saved ? '取消收藏' : '收藏'}${name}`);
          button.title = saved ? '取消收藏' : '收藏';
        });
        const fromFavorites = favoriteButton.closest('#group-favorites');
        document.querySelector('#group-favorites .app-grid').innerHTML = favoriteGroup.apps.map(item => renderCard(item, favoriteGroup)).join('');
        rail.querySelector('[data-category="我的收藏"] .category-count').textContent = favorites.size;
        document.querySelector('#group-favorites .group-count').textContent = favorites.size;
        applyFilter();
        if (fromFavorites) {
          const replacement = [...groupsRoot.querySelectorAll('.app-link')].find(card => card.dataset.name === name)?.querySelector('.app-favorite');
          (replacement || document.querySelector('#group-favorites .group-heading')).focus();
        }
        toast(saved ? '已加入我的收藏' : '已取消收藏');
        return;
      }
      const infoButton = event.target.closest('.app-info-trigger');
      if (infoButton) {
        if (mobileHome.matches && activeInfoButton === infoButton) closeInfo(); else openInfo(infoButton);
        return;
      }
      const heading = event.target.closest('.group-heading');
      if (heading) {
        closeInfo();
        const group = heading.closest('.workflow-group');
        const collapsed = group.classList.toggle('collapsed');
        heading.setAttribute('aria-expanded', String(!collapsed));
        return;
      }
      const link = event.target.closest('.app-link-main');
      if (link && link.getAttribute('href') === '#') {
        event.preventDefault();
        toast(`${link.closest('.app-link').dataset.name} · 页面演示入口`);
      }
    });
    groupsRoot.addEventListener('keydown', event => {
      if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('.group-heading')) {
        event.preventDefault();
        event.target.click();
      }
    });

    const infoPopover = document.createElement('section');
    infoPopover.id = 'homeWorkflowInfo';
    infoPopover.className = 'app-info-popover';
    infoPopover.setAttribute('aria-label', '流程详情');
    infoPopover.hidden = true;
    document.body.append(infoPopover);
    const infoBackdrop = document.createElement('div');
    infoBackdrop.className = 'mobile-sheet-backdrop';
    infoBackdrop.hidden = true;
    document.body.append(infoBackdrop);
    let activeInfoButton = null;
    let infoCloseTimer;
    let restoringInfoFocus = false;
    const cancelInfoClose = () => clearTimeout(infoCloseTimer);
    const scheduleInfoClose = () => {
      if (mobileHome.matches) return;
      cancelInfoClose();
      infoCloseTimer = setTimeout(closeInfo, 200);
    };
    const infoViewport = groupsRoot.closest('.main-shell');
    const positionInfoPopover = () => {
      if (!activeInfoButton || infoPopover.hidden) return;
      infoBackdrop.hidden = !mobileHome.matches;
      document.body.classList.toggle('mobile-sheet-open', mobileHome.matches);
      infoPopover.setAttribute('role', mobileHome.matches ? 'dialog' : 'region');
      if (mobileHome.matches) {
        infoPopover.setAttribute('aria-modal', 'true');
        return;
      }
      infoPopover.removeAttribute('aria-modal');
      const cardRect = activeInfoButton.closest('.app-link').getBoundingClientRect();
      const viewportRect = infoViewport.getBoundingClientRect();
      if (cardRect.bottom <= viewportRect.top || cardRect.top >= Math.min(viewportRect.bottom, window.innerHeight)) { closeInfo(); return; }
      infoPopover.style.maxHeight = '';
      const height = infoPopover.getBoundingClientRect().height;
      const below = window.innerHeight - cardRect.bottom - 18;
      const above = cardRect.top - 18;
      const opensAbove = below < Math.min(height, 160) && above > below;
      const available = Math.max(60, opensAbove ? above : below);
      infoPopover.style.maxHeight = `${available}px`;
      infoPopover.dataset.placement = opensAbove ? 'above' : 'below';
      infoPopover.style.left = `${Math.max(12, Math.min(cardRect.left, window.innerWidth - infoPopover.offsetWidth - 12))}px`;
      infoPopover.style.top = `${opensAbove ? cardRect.top - infoPopover.offsetHeight - 6 : cardRect.bottom + 6}px`;
    };
    const openInfo = button => {
      cancelInfoClose();
      if (activeInfoButton === button) return;
      closeInfo();
      activeInfoButton = button;
      const card = button.closest('.app-link');
      const name = card.dataset.name;
      infoPopover.innerHTML = `<div class="app-info-heading"><strong>${escapeHtml(name)}</strong><button class="app-info-close" type="button" aria-label="关闭流程详情">×</button></div>${workflowInfoContent(workflowInfo[name])}`;
      button.setAttribute('aria-expanded', 'true');
      card.classList.add('info-open');
      infoPopover.hidden = false;
      positionInfoPopover();
      if (mobileHome.matches) infoPopover.querySelector('.app-info-close').focus();
    };
    const closeInfo = () => {
      cancelInfoClose();
      activeInfoButton?.setAttribute('aria-expanded', 'false');
      activeInfoButton?.closest('.app-link').classList.remove('info-open');
      activeInfoButton = null;
      infoPopover.hidden = true;
      infoBackdrop.hidden = true;
      document.body.classList.remove('mobile-sheet-open');
    };
    infoBackdrop.addEventListener('click', () => {
      const button = activeInfoButton;
      closeInfo();
      button?.focus();
    });
    groupsRoot.addEventListener('pointerover', event => {
      const button = event.target.closest('.app-info-trigger');
      if (button && !mobileHome.matches && event.pointerType !== 'touch' && !button.contains(event.relatedTarget)) openInfo(button);
    });
    groupsRoot.addEventListener('pointerout', event => {
      const button = event.target.closest('.app-info-trigger');
      if (button && button === activeInfoButton && !button.contains(event.relatedTarget) && !infoPopover.contains(event.relatedTarget)) scheduleInfoClose();
    });
    groupsRoot.addEventListener('focusin', event => {
      const button = event.target.closest('.app-info-trigger');
      if (button && !mobileHome.matches && !restoringInfoFocus) openInfo(button);
    });
    groupsRoot.addEventListener('focusout', event => {
      if (event.target === activeInfoButton && !infoPopover.contains(event.relatedTarget)) scheduleInfoClose();
    });
    infoPopover.addEventListener('pointerenter', cancelInfoClose);
    infoPopover.addEventListener('pointerleave', event => {
      if (!activeInfoButton?.contains(event.relatedTarget)) scheduleInfoClose();
    });
    infoPopover.addEventListener('focusin', cancelInfoClose);
    infoPopover.addEventListener('focusout', event => {
      if (!infoPopover.contains(event.relatedTarget) && !activeInfoButton?.contains(event.relatedTarget)) scheduleInfoClose();
    });
    infoPopover.addEventListener('click', event => {
      if (event.target.closest('.app-info-close')) {
        const button = activeInfoButton;
        closeInfo();
        restoringInfoFocus = true;
        button?.focus();
        restoringInfoFocus = false;
      }
    });
    infoViewport?.addEventListener('scroll', positionInfoPopover);
    window.addEventListener('resize', positionInfoPopover);
    document.addEventListener('click', event => {
      if (!event.target.closest('.app-info-trigger') && !infoPopover.contains(event.target)) closeInfo();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Tab' && activeInfoButton && mobileHome.matches) {
        event.preventDefault();
        infoPopover.querySelector('.app-info-close').focus();
      }
      if (event.key === 'Escape' && activeInfoButton) {
        const button = activeInfoButton;
        closeInfo();
        restoringInfoFocus = true;
        button.focus();
        restoringInfoFocus = false;
      }
    });
    rail.querySelector('[data-category="我的收藏"] .category-count').textContent = favorites.size;
    document.querySelector('#group-favorites .group-count').textContent = favorites.size;
    applyFilter();

    const searchToggle = document.getElementById('mobileSearchToggle');
    searchToggle?.addEventListener('click', () => {
      const open = document.body.classList.toggle('mobile-search-open');
      searchToggle.setAttribute('aria-expanded', String(open));
      if (open) { infoViewport.scrollTop = 0; search?.focus(); }
      else { search.value = ''; applyFilter(); }
    });
    const categorySheet = document.getElementById('mobileCategorySheet');
    const categoryBackdrop = document.getElementById('mobileCategoryBackdrop');
    const categoryToggle = document.getElementById('mobileCategoryToggle');
    const closeCategories = () => {
      categorySheet.hidden = true;
      categoryBackdrop.hidden = true;
      categoryToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('mobile-sheet-open');
    };
    categoryToggle?.addEventListener('click', () => {
      closeInfo();
      document.getElementById('mobileCategoryOptions').innerHTML = [...rail.querySelectorAll('.category-row')].map(row => `<button type="button" data-category="${escapeHtml(row.dataset.category)}" class="${row.classList.contains('active') ? 'active' : ''}"><span>${escapeHtml(row.dataset.category)}</span><small>${row.querySelector('.category-count').textContent}</small></button>`).join('');
      categorySheet.hidden = false;
      categoryBackdrop.hidden = false;
      document.body.classList.add('mobile-sheet-open');
      categoryToggle.setAttribute('aria-expanded', 'true');
      document.getElementById('mobileCategoryClose').focus();
    });
    categoryBackdrop?.addEventListener('click', closeCategories);
    mobileHome.addEventListener('change', () => { closeInfo(); closeCategories(); });
    document.getElementById('mobileCategoryClose')?.addEventListener('click', () => { closeCategories(); categoryToggle.focus(); });
    categorySheet?.addEventListener('click', event => {
      const button = event.target.closest('[data-category]');
      if (!button) return;
      closeCategories();
      const row = [...rail.querySelectorAll('.category-row')].find(item => item.dataset.category === button.dataset.category);
      row?.click();
      row?.focus();
      if (row) rail.scrollTo({left:row.offsetLeft - 16, behavior:'smooth'});
    });
    document.addEventListener('keydown', event => {
      if (categorySheet.hidden) return;
      if (event.key === 'Escape') { closeCategories(); categoryToggle.focus(); }
      if (event.key === 'Tab') {
        const controls = [...categorySheet.querySelectorAll('button')];
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
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
    const mobileIntroTrigger = document.getElementById('mobileIntroTrigger');
    const mobileDetail = window.matchMedia('(max-width: 650px)');
    const introBackdrop = document.createElement('div');
    introBackdrop.className = 'mobile-sheet-backdrop';
    introBackdrop.hidden = true;
    if (introPopover) document.body.append(introBackdrop);
    const closeWorkflowIntro = () => {
      if (!introTrigger || !introPopover) return;
      introPopover.hidden = true;
      introTrigger.setAttribute('aria-expanded', 'false');
      mobileIntroTrigger?.setAttribute('aria-expanded', 'false');
      introBackdrop.hidden = true;
      document.body.classList.remove('mobile-intro-open');
    };
    const toggleWorkflowIntro = () => {
      if (!introPopover) return;
      const open = introPopover.hidden;
      introPopover.hidden = !open;
      introTrigger.setAttribute('aria-expanded', String(open));
      mobileIntroTrigger?.setAttribute('aria-expanded', String(open));
      introBackdrop.hidden = !(open && mobileDetail.matches);
      introPopover.setAttribute('aria-modal', String(open && mobileDetail.matches));
      document.body.classList.toggle('mobile-intro-open', open && mobileDetail.matches);
      if (open && mobileDetail.matches) document.getElementById('mobileIntroClose')?.focus();
    };
    introTrigger?.addEventListener('click', toggleWorkflowIntro);
    mobileIntroTrigger?.addEventListener('click', toggleWorkflowIntro);
    introBackdrop.addEventListener('click', closeWorkflowIntro);
    if (introPopover) {
      const introClose = document.createElement('button');
      introClose.id = 'mobileIntroClose';
      introClose.className = 'mobile-only mobile-intro-close';
      introClose.type = 'button';
      introClose.setAttribute('aria-label', '关闭流程介绍');
      introClose.textContent = '×';
      introPopover.querySelector('.flow-intro-heading').append(introClose);
      introClose.addEventListener('click', () => { closeWorkflowIntro(); mobileIntroTrigger?.focus(); });
      const placeIntro = () => {
        closeWorkflowIntro();
        (mobileDetail.matches ? document.body : introControl).append(introPopover);
      };
      placeIntro();
      mobileDetail.addEventListener('change', placeIntro);
    }
    document.addEventListener('click', event => {
      if (introControl && !introControl.contains(event.target) && !introPopover?.contains(event.target) && !mobileIntroTrigger?.contains(event.target)) closeWorkflowIntro();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && introPopover && !introPopover.hidden) {
        closeWorkflowIntro();
        (mobileDetail.matches ? mobileIntroTrigger : introTrigger)?.focus();
      }
      if (event.key === 'Tab' && mobileDetail.matches && introPopover && !introPopover.hidden) { event.preventDefault(); document.getElementById('mobileIntroClose')?.focus(); }
    });

    const sideTools = document.getElementById('mobileSideTools');
    const sideToggle = document.getElementById('mobileSideToggle');
    sideToggle?.addEventListener('click', () => {
      const collapsed = sideTools.classList.toggle('is-collapsed');
      sideToggle.setAttribute('aria-expanded', String(!collapsed));
      sideToggle.setAttribute('aria-label', collapsed ? '展开流程工具' : '收起流程工具');
    });
    const noticeCard = document.querySelector('.notice-content')?.closest('.form-card');
    if (noticeCard) {
      noticeCard.classList.add('mobile-notice-card');
      const noticeToggle = document.createElement('button');
      noticeToggle.type = 'button';
      noticeToggle.className = 'mobile-only mobile-notice-toggle';
      noticeToggle.setAttribute('aria-expanded', 'false');
      noticeToggle.textContent = '展开加时说明 ⌄';
      noticeCard.append(noticeToggle);
      noticeToggle.addEventListener('click', () => {
        const open = noticeCard.classList.toggle('notice-expanded');
        noticeToggle.setAttribute('aria-expanded', String(open));
        noticeToggle.textContent = open ? '收起加时说明 ⌃' : '展开加时说明 ⌄';
      });
    }
    document.getElementById('mobileSaveButton')?.addEventListener('click', () => {
      try {
        localStorage.setItem('office-aircon-draft-v1', JSON.stringify({reason:document.getElementById('reason').value}));
        toast('草稿已保存');
      } catch { toast('当前浏览器无法保存草稿，请稍后重试'); }
    });
    if (workflowIntro) {
      try {
        const draft = JSON.parse(localStorage.getItem('office-aircon-draft-v1'));
        if (typeof draft?.reason === 'string') document.getElementById('reason').value = draft.reason;
      } catch { /* Start with the sample application if no saved draft is available. */ }
    }

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
        if (reviewerRow) {
          reviewerRow.classList.toggle('detail-open', shouldOpen);
          reviewerToggle.setAttribute('aria-expanded', String(shouldOpen));
          reviewerToggle.classList.toggle('is-open', shouldOpen);
          reviewerRow.querySelector('.reviewer-detail-wrap').hidden = !shouldOpen;
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
