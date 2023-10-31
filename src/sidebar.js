import { toggleLoaded, onChevronClick } from './util.js';

// Main function
function main(vm) {
    const sidebar = document.querySelector('.sidebar > .sidebar-nav');

    // Normalize Sidebar
    // Remove 'p' between 'li' and 'a'
    sidebar.querySelectorAll('li:has(> p > a)').forEach(el => {
        const pEl = el.firstElementChild;
        const aEl = el.firstElementChild.firstElementChild;
        const isActive = pEl.classList.contains('active');
        pEl.remove();
        el.prepend(aEl);
        if (isActive) el.classList.add('active');
    });

    // Add missing 'p' element to folders
    sidebar.querySelectorAll('li:has(> ul):not(:has(> a, > p))').forEach(el => {
        const pEl = document.createElement('p');
        // nest strong element inside p element for collapsible behaviour
        if (el.matches('li:has(> strong)')) {
            const sEl = el.firstElementChild;
            sEl.remove();
            pEl.appendChild(sEl);
        } else {
            const textContent = el.firstChild.textContent;
            el.firstChild.textContent = "";
            pEl.textContent = textContent;
        }
        el.prepend(pEl);
    });

    // Add event listeners to collapse and uncollapse
    // Folders
    sidebar.querySelectorAll('li:has(p + ul, strong + ul)').forEach(el => {
        el.addEventListener('click', toggleLoaded);
    });

    // LinkFolders
    sidebar.querySelectorAll('li:has(> a + ul)').forEach(el => {
        const aEl = el.firstElementChild;
        aEl.addEventListener('click', onChevronClick);
    });

    // Set active link
    const path = vm.route.path;
    const activeEl = sidebar.querySelector(`li:has(> a[href='${path}'])`);
    activeEl.classList.add('active');

    // Uncollapse tree with active link
    sidebar.querySelectorAll('li:has(li.active)').forEach(el => {
        if (el.matches('li:has(> a)') && !el.classList.contains('active')) {
            el.classList.add('loaded');
        } else if (el.matches('li:has(> p)')) {
            el.classList.add('loaded');
        }
    });

    // Override Docsify auto-active-link
    const observerConfig = { attributes: true, attributeFilter: ['class'] };
    const observer = new MutationObserver(mutList => {
        mutList.forEach(mut => {
            if (mut.type === 'attributes' && !activeEl.classList.contains('active')) {
                activeEl.classList.add('active');
            }
        });
    });
    observer.observe(activeEl, observerConfig);
}

export function install(hook, vm) {
    if (vm.config.enableSidebarCollapse) {
        vm.config.subMaxLevel = 0;
        hook.doneEach(function () {
            // Watch for sidebar
            const observer = new MutationObserver(() => {
                const sidebar = document.querySelector('.sidebar > .sidebar-nav > ul');
                // Execute main after sidebar has been loaded into DOM
                if (sidebar) {
                    observer.disconnect();
                    main(vm);
                }
            });
            observer.observe(document.documentElement, { childList: true, subtree: true });
        });
    }
}

