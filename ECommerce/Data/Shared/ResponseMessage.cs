namespace DealManager.Models
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
        public string MessageClass
        {
            get
            {
                switch(StatusCode)
                {
                    case ResponseStatus.SUCCESS:
                        return "text-success";
                    case ResponseStatus.ERROR:
                    case ResponseStatus.EXCEPTION:
                    case ResponseStatus.WARNING:
                    case ResponseStatus.UNKNOWN:
                        return "text-danger";
                }

                return string.Empty;
            }
        }

        public string AlertMessageClass
        {
            get
            {
                switch (StatusCode)
                {
                    case ResponseStatus.SUCCESS:
                        return "alert-success";
                    case ResponseStatus.ERROR:
                    case ResponseStatus.EXCEPTION:
                    case ResponseStatus.WARNING:
                    case ResponseStatus.UNKNOWN:
                        return "alert-danger";
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



