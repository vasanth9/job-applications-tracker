document.addEventListener('DOMContentLoaded', () => {
    const applicationListContainer = document.getElementById('application-list-items');
    const detailPane = document.querySelector('.detail-pane');
    const detailPaneContent = document.getElementById('detail-pane-content');
    const sidebar = document.querySelector('.sidebar');
    const sidebarMenu = document.querySelector('.sidebar-menu');
    const filterButton = document.getElementById('filter-button');
    const backButton = document.getElementById('back-button');

    // Iframe Modal elements
    const iframeModal = document.getElementById('iframe-modal');
    const iframeModalTitle = document.getElementById('iframe-modal-title');
    const iframeModalNewTabLink = document.getElementById('iframe-modal-new-tab-link');
    const closeIframeModalButton = document.getElementById('close-iframe-modal-button');
    const jobLinkIframe = document.getElementById('job-link-iframe');

    const dataFile = 'data/applications.json';
    let applications = [];
    let currentStatusFilter = 'all';

    async function fetchData() {
        try {
            const response = await fetch(dataFile);
            if (!response.ok) {
                console.error(`Error fetching ${dataFile}: ${response.statusText}`);
                return;
            }
            applications = await response.json();
            
            // Sort applications by the most recent date
            applications.sort((a, b) => {
                const dateA = new Date(a.rejectedDate || a.offerDate || a.interviewDate || a.appliedDate);
                const dateB = new Date(b.rejectedDate || b.offerDate || b.interviewDate || b.appliedDate);
                return dateB - dateA;
            });

            renderApplicationList();
            setupEventListeners();
        } catch (error) {
            console.error(`Error fetching or parsing ${dataFile}:`, error);
        }
    }

    function setupEventListeners() {
        sidebarMenu.addEventListener('click', (event) => {
            if (event.target.tagName === 'LI') {
                const status = event.target.dataset.status;
                currentStatusFilter = status;

                sidebar.querySelector('.active').classList.remove('active');
                event.target.classList.add('active');

                renderApplicationList();
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('visible');
                    document.removeEventListener('click', closeSidebarIfClickedOutside);
                }
            }
        });

        filterButton.addEventListener('click', (event) => {
            event.stopPropagation();
            sidebar.classList.toggle('visible');
            if (sidebar.classList.contains('visible')) {
                document.addEventListener('click', closeSidebarIfClickedOutside);
            } else {
                document.removeEventListener('click', closeSidebarIfClickedOutside);
            }
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
    }

    function closeSidebarIfClickedOutside(event) {
        if (!sidebar.contains(event.target) && !filterButton.contains(event.target)) {
            sidebar.classList.remove('visible');
            document.removeEventListener('click', closeSidebarIfClickedOutside);
        }
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
                if (applicationListContainer.children[0]) {
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
            <div class="list-item-date">
                ${mostRecentDate}
            </div>
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
        let datesHtml = `
            <div class="detail-section">
                <h3>Applied Date</h3>
                <p>${app.appliedDate}</p>
            </div>
        `;
        if(app.interviewDate) {
            datesHtml += `
                <div class="detail-section">
                    <h3>Interview Date</h3>
                    <p>${app.interviewDate}</p>
                </div>
            `;
        }
        if(app.offerDate) {
            datesHtml += `
                <div class="detail-section">
                    <h3>Offer Date</h3>
                    <p>${app.offerDate}</p>
                </div>
            `;
        }
        if(app.rejectedDate) {
            datesHtml += `
                <div class="detail-section">
                    <h3>Rejected Date</h3>
                    <p>${app.rejectedDate}</p>
                </div>
            `;
        }


        detailPaneContent.innerHTML = `
            <div class="detail-header">
                <h2>${app.company}</h2>
                <p>${app.role}</p>
                <div class="detail-actions">
                    <button class="button" id="open-job-posting">Open Job Posting</button>
                </div>
            </div>
            <div class="detail-section">
                <h3>Status</h3>
                <p><span class="status-badge status-${app.status.toLowerCase()}">${app.status}</span></p>
            </div>
            ${datesHtml}
            <div class="detail-section">
                <h3>Location</h3>
                <p>${app.location || 'N/A'}</p>
            </div>
            <div class="detail-section">
                <h3>Portal</h3>
                <p>${app.portal || 'N/A'}</p>
            </div>
            <div class="detail-section">
                <h3>Notes</h3>
                <p>${app.notes || 'No notes yet.'}</p>
            </div>
        `;

        document.getElementById('open-job-posting').addEventListener('click', () => {
            openIframeModal(app);
        });
    }
    
    function clearDetailView() {
        detailPaneContent.innerHTML = `
            <div class="empty-view">
                <p>Select an application to see the details</p>
            </div>
        `;
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

    fetchData();
});
