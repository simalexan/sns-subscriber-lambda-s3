module.exports = (event) => {
	if (!event || !event.Records || !Array.isArray(event.Records)) {
		return [];
    }
    let extractMessage = record => record.Sns && record.Sns.Message;
	return event.Records.map(extractMessage).filter(message => message);
};
