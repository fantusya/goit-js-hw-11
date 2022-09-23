export default function calculateBodyPaddingTop(element) {
    const { height: pageHeaderHeight } = element.getBoundingClientRect();
    
    document.body.style.paddingTop = `${pageHeaderHeight + 15}px`;
}