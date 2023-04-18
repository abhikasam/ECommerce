namespace ECommerce.Models
{
    public class ResponseMessage
    {
        public string Message { get; set; }
        public string Status
        {
            get
            {
                return ((ResponseStatus)this.StatusCode).ToString();
            }
        }
        public ResponseStatus StatusCode { get; set; } = ResponseStatus.UNKNOWN;
        public string Type
        {
            get
            {
                switch(StatusCode)
                {
                    case ResponseStatus.UNKNOWN:
                    case ResponseStatus.SUCCESS:
                        return "success";
                    case ResponseStatus.WARNING:
                        return "warning";
                    case ResponseStatus.ERROR:
                    case ResponseStatus.EXCEPTION:
                        return "danger";
                }

                return string.Empty;
            }
        }
        public object Data { get; set; }
        public bool HasData { get; set; }
    }

    public enum ResponseStatus
    {
        UNKNOWN = 0,
        SUCCESS = 1,
        ERROR = 2,
        WARNING = 3,
        EXCEPTION = 4
    }
}



