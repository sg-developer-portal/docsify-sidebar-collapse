export function toggleLoaded(e) {
    if (e.target.matches('a')) {
        return;
    }
    e.stopPropagation();
    const node = e.currentTarget;
    node.classList.toggle("loaded");
}

export function onChevronClick(e) {
    const node = e.target;
    const liEl = node.parentElement;
    const clickX = e.clientX - node.getBoundingClientRect().left;
    const paddingLeft = parseInt(getComputedStyle(node).paddingLeft);
    if (clickX <= paddingLeft) {
        e.preventDefault();
        e.stopPropagation();
        if (liEl.classList.contains('active')) {
            liEl.classList.toggle('collapse');
        } else {
            liEl.classList.toggle('loaded');
        }
    }
}

