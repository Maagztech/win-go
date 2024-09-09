import ReactGA4 from "react-ga4";
export const eventTrack = (
    category,
    action,
    label) => {
    try {
        ReactGA4.event({
            category: action,
            action: category,
            label: label,
        });
    } catch (err) {
        console.log("Err", err);
    }
};
