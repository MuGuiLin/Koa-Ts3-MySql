import moment from "moment";

// https://momentjs.com/docs
moment.updateLocale('zh-cn', {
    meridiem: function (hour, minute, isLowercase) {
        if (hour < 9) {
            return "早上";
        } else if (hour < 11 && minute < 30) {
            return "上午";
        } else if (hour < 13 && minute < 30) {
            return "中午";
        } else if (hour < 18) {
            return "下午";
        } else {
            return "晚上";
        }
    }
});

export default date => {
    return moment(date).format('LLL');
}