export const getPageByID = state => {
    return state.activity.pages.map(({ pageID }) => {
        const page = state.activity.pages.find(p => p.pageID === pageID);
        return page;
    });
};
