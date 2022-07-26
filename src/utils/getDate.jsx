export const getDate = () => {
    const date = new Date();
    let formattedDate = date.toLocaleDateString("vi-VI", {
      timeZone: "Asia/Saigon",
    });
    return formattedDate
}