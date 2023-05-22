export function toggleCollapse(e) {
    e.stopPropagation();
    const node = e.currentTarget;
    node.classList.toggle("collapse");
}

export function toggleLoaded(e) {
    e.stopPropagation();
    const node = e.currentTarget;
    node.classList.toggle("loaded");
}

export function onChevronClick(e) {
    const node = e.target;
    const clickX = e.clientX - node.getBoundingClientRect().left;
    const paddingLeft = parseInt(getComputedStyle(node).paddingLeft);
    if (clickX <= paddingLeft) {
        e.preventDefault();
        e.stopPropagation();
        node.parentElement.classList.toggle('loaded');
    }
}

