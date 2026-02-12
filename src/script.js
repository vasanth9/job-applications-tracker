document.addEventListener('DOMContentLoaded', () => {
    const applicationListContainer = document.getElementById('application-list-items');
    const detailPane = document.querySelector('.detail-pane');
    const detailPaneContent = document.getElementById('detail-pane-content');
    const sidebar = document.querySelector('.sidebar');
    const sidebarMenu = document.querySelector('.sidebar-menu');
    const filterButton = document.getElementById('filter-button');
    const backButton = document.getElementById('back-button');
    const mainViewTitle = document.getElementById('main-view-title');

    // Iframe Modal elements
    const iframeModal = document.getElementById('iframe-modal');
    const iframeModalTitle = document.getElementById('iframe-modal-title');
    const iframeModalNewTabLink = document.getElementById('iframe-modal-new-tab-link');
    const closeIframeModalButton = document.getElementById('close-iframe-modal-button');
    const jobLinkIframe = document.getElementById('job-link-iframe');

    // Analytics
    const analyticsView = document.getElementById('analytics-view');
    const trendsChartCanvas = document.getElementById('trends-chart');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const statusFilters = document.getElementById('status-filters');

    const dataFile = 'data/applications.json';
    let applications = [];
    let currentStatusFilter = 'all';
    let trendsChart;

    async function fetchData() {
        try {
            const response = await fetch(dataFile);
            if (!response.ok) {
                console.error(`Error fetching ${dataFile}: ${response.statusText}`);
                return;
            }
            applications = await response.json();
            
            applications.sort((a, b) => {
                const dateA = new Date(a.rejectedDate || a.offerDate || a.interviewDate || a.appliedDate);
                const dateB = new Date(b.rejectedDate || b.offerDate || b.interviewDate || b.appliedDate);
                return dateB - dateA;
            });

            renderApplicationList();
            setupEventListeners();
            setupAnalytics();
        } catch (error) {
            console.error(`Error fetching or parsing ${dataFile}:`, error);
        }
    }

    function setupEventListeners() {
        sidebarMenu.addEventListener('click', (event) => {
            if (event.target.tagName === 'LI') {
                const status = event.target.dataset.status;

                sidebar.querySelector('.active').classList.remove('active');
                event.target.classList.add('active');

                if (status === 'analytics') {
                    showAnalyticsView();
                } else {
                    currentStatusFilter = status;
                    showApplicationsView();
                    renderApplicationList();
                }

                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('visible');
                }
            }
        });

        filterButton.addEventListener('click', (event) => {
            event.stopPropagation();
            sidebar.classList.toggle('visible');
        });

        backButton.addEventListener('click', () => {
            detailPane.classList.remove('visible');
        });
        
        closeIframeModalButton.addEventListener('click', closeIframeModal);
        iframeModal.addEventListener('click', (event) => {
            if(event.target === iframeModal) {
                closeIframeModal();
            }
        });

        startDateInput.addEventListener('change', updateChart);
        endDateInput.addEventListener('change', updateChart);
        statusFilters.addEventListener('change', updateChart);
    }
    
    function showAnalyticsView() {
        applicationListContainer.classList.add('hidden');
        analyticsView.classList.remove('hidden');
        detailPane.classList.add('hidden');
        mainViewTitle.innerText = 'Analytics';
        calculateAndRenderAllAnalytics();
        updateChart();
    }

    function showApplicationsView() {
        applicationListContainer.classList.remove('hidden');
        analyticsView.classList.add('hidden');
        detailPane.classList.remove('hidden');
        mainViewTitle.innerText = 'Applications';
    }


    function renderApplicationList() {
        applicationListContainer.innerHTML = '';
        const filteredApplications = applications.filter(app => 
            currentStatusFilter === 'all' || app.status === currentStatusFilter
        );

        if (filteredApplications.length === 0) {
            applicationListContainer.innerHTML = '<p class="empty-view">No applications found.</p>';
            clearDetailView();
            return;
        }

        filteredApplications.forEach((app, index) => {
            const item = createApplicationListItem(app, index);
            applicationListContainer.appendChild(item);
        });

        if (window.innerWidth > 768) {
            if(filteredApplications.length > 0) {
                renderApplicationDetails(filteredApplications[0]);
                if(applicationListContainer.children[0]) {
                   applicationListContainer.children[0].classList.add('selected');
                }
            } else {
                clearDetailView();
            }
        }
    }

    function createApplicationListItem(app, index) {
        const item = document.createElement('div');
        item.classList.add('application-list-item');
        item.dataset.index = index;
        const mostRecentDate = app.rejectedDate || app.offerDate || app.interviewDate || app.appliedDate;

        item.innerHTML = `
            <div>
                <h3>${app.company}</h3>
                <p>${app.role}</p>
            </div>
            <div class="list-item-date">${mostRecentDate}</div>
        `;

        item.addEventListener('click', (event) => {
            if (window.innerWidth > 768) {
                const allItems = document.querySelectorAll('.application-list-item');
                allItems.forEach(i => i.classList.remove('selected'));
                event.currentTarget.classList.add('selected');
            } else {
                detailPane.classList.add('visible');
            }
            renderApplicationDetails(app);
        });

        return item;
    }

    function renderApplicationDetails(app) {
        let datesHtml = `<div class="detail-section"><h3>Applied Date</h3><p>${app.appliedDate}</p></div>`;
        if(app.interviewDate) datesHtml += `<div class="detail-section"><h3>Interview Date</h3><p>${app.interviewDate}</p></div>`;
        if(app.offerDate) datesHtml += `<div class="detail-section"><h3>Offer Date</h3><p>${app.offerDate}</p></div>`;
        if(app.rejectedDate) datesHtml += `<div class="detail-section"><h3>Rejected Date</h3><p>${app.rejectedDate}</p></div>`;

        detailPaneContent.innerHTML = `
            <div class="detail-header">
                <h2>${app.company}</h2>
                <p>${app.role}</p>
                <div class="detail-actions">
                    <button class="button" id="open-job-posting">Open Job Posting</button>
                </div>
            </div>
            <div class="detail-section"><h3>Status</h3><p><span class="status-badge status-${app.status.toLowerCase()}">${app.status}</span></p></div>
            ${datesHtml}
            <div class="detail-section"><h3>Location</h3><p>${app.location || 'N/A'}</p></div>
            <div class="detail-section"><h3>Portal</h3><p>${app.portal || 'N/A'}</p></div>
            <div class="detail-section"><h3>Notes</h3><p>${app.notes || 'No notes yet.'}</p></div>
        `;

        document.getElementById('open-job-posting').addEventListener('click', () => openIframeModal(app));
    }
    
    function clearDetailView() {
        detailPaneContent.innerHTML = '<div class="empty-view"><p>Select an application to see details</p></div>';
    }

    function openIframeModal(app) {
        iframeModalTitle.innerText = `Job Posting: ${app.company}`;
        iframeModalNewTabLink.href = app.link;
        jobLinkIframe.src = app.link;
        iframeModal.classList.remove('hidden');
    }

    function closeIframeModal() {
        jobLinkIframe.src = '';
        iframeModal.classList.add('hidden');
    }
    
    function getStartOfWeek(date) {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); 
        return new Date(d.setDate(diff));
    }

    function setupAnalytics() {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 30);
        startDateInput.value = startDate.toISOString().slice(0, 10);
        endDateInput.value = endDate.toISOString().slice(0, 10);

        const ctx = trendsChartCanvas.getContext('2d');
        trendsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: []
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        updateChart();
    }
    
    function updateChart() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        const selectedStatuses = [...statusFilters.querySelectorAll('input:checked')].map(el => el.value);

        const filteredApps = applications.filter(app => {
            const appDate = new Date(app.appliedDate);
            return appDate >= startDate && appDate <= endDate;
        });

        const labels = [];
        const datasets = {};
        selectedStatuses.forEach(status => {
            datasets[status] = {};
        });

        let currentDate = new Date(startDate);
        while(currentDate <= endDate) {
            labels.push(currentDate.toLocaleDateString());
            selectedStatuses.forEach(status => {
                datasets[status][currentDate.toLocaleDateString()] = 0;
            });
            currentDate.setDate(currentDate.getDate() + 1);
        }

        filteredApps.forEach(app => {
            if(selectedStatuses.includes(app.status)) {
                const appDate = new Date(app.appliedDate).toLocaleDateString();
                if(datasets[app.status][appDate] !== undefined) {
                    datasets[app.status][appDate]++;
                }
            }
        });

        trendsChart.data.labels = labels;
        trendsChart.data.datasets = selectedStatuses.map(status => {
            return {
                label: status,
                data: Object.values(datasets[status]),
                borderColor: getStatusColor(status),
                tension: 0.1
            }
        });
        trendsChart.update();
    }
    
    function getStatusColor(status) {
        switch(status) {
            case 'Applied': return '#17a2b8';
            case 'Interviewing': return '#ffc107';
            case 'Offer': return '#28a745';
            case 'Rejected': return '#dc3545';
            default: return '#000000';
        }
    }


    function calculateAndRenderAllAnalytics() {
        // This function is no longer needed in this form
    }

    function renderAnalyticsResults(analytics) {
        // This function is no longer needed in this form
    }

    fetchData();
});
