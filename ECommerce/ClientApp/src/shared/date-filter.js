import { useEffect } from "react";
import { Fragment, useState } from "react"




export default function DateFilter({ updateDateRange }) {

    const [startDate, setStartDate] = useState({
        year: '',
        month: '',
        day: ''
    })
    const [endDate, setEndDate] = useState({
        year: '',
        month: '',
        day: ''
    })

    const range = (start, stop, step) =>
        Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

    const years = range(2020, 2023, 1)

    const months = [
        { key: 0, value: 'Jan' },
        { key: 1, value: 'Feb' },
        { key: 2, value: 'Mar' },
        { key: 3, value: 'Apr' },
        { key: 4, value: 'May' },
        { key: 5, value: 'Jun' },
        { key: 6, value: 'Jul' },
        { key: 7, value: 'Aug' },
        { key: 8, value: 'Sep' },
        { key: 9, value: 'Oct' },
        { key: 10, value: 'Nov' },
        { key: 11, value: 'Dec' }
    ]

    const monthDayMappings = [
        { key: 0, leap: 31, nonLeap: 31 },
        { key: 1, leap: 29, nonLeap: 28 },
        { key: 2, leap: 31, nonLeap: 31 },
        { key: 3, leap: 30, nonLeap: 30 },
        { key: 4, leap: 31, nonLeap: 31 },
        { key: 5, leap: 30, nonLeap: 30 },
        { key: 6, leap: 31, nonLeap: 31 },
        { key: 7, leap: 31, nonLeap: 31 },
        { key: 8, leap: 30, nonLeap: 30 },
        { key: 9, leap: 31, nonLeap: 31 },
        { key: 10, leap: 30, nonLeap: 30 },
        { key: 11, leap: 31, nonLeap: 31 }
    ]

    useEffect(() => {
        let result = ''
        result += (startDate.day.length ? startDate.day : 'dd') + '/'
        result += (startDate.month.length ? startDate.month : 'MM') + '/'
        result += (startDate.year.length ? startDate.year : 'yy')
        result += '-'
        result += (endDate.day.length ? endDate.day : 'dd') + '/'
        result += (endDate.month.length ? endDate.month : 'MM') + '/'
        result += (endDate.year.length ? endDate.year : 'yy')
        updateDateRange(result)
    }, [updateDateRange, startDate, endDate])

    function checkLeapYear(year) {
        if (year % 100 === 0 && year % 400 === 0)
            return true;
        else if (year % 100 !== 0 && year % 4 === 0)
            return true;
        else return false;
    }

    function startDateYearChangeHandler(value) {
        setStartDate(prev => {
            let date = prev;
            date.year = value;
            date.day = ''
            date.month = ''
            return { ...date };
        })
        endDateYearChangeHandler('');
    }

    function startDateMonthChangeHandler(value) {
        setStartDate(prev => {
            let date = prev;
            date.month = value;
            date.day = ''
            return { ...date };
        })
    }

    function startDateDayChangeHandler(value) {
        setStartDate(prev => {
            let date = prev;
            date.day = value;
            return { ...date };
        })
    }

    function endDateYearChangeHandler(value) {
        setEndDate(prev => {
            let date = prev;
            date.year = value;
            date.day = ''
            date.month = ''
            return { ...date };
        })
    }

    function endDateMonthChangeHandler(value) {
        setEndDate(prev => {
            let date = prev;
            date.month = value;
            date.day = ''
            return { ...date };
        })
    }

    function endDateDayChangeHandler(value) {
        setEndDate(prev => {
            let date = prev;
            date.day = value;
            return { ...date };
        })
    }

    function getDays(year, month) {
        let isLeap = checkLeapYear(year)
        let monthDayMapping = monthDayMappings.find(i => i.key === parseInt(month));
        let maxDays = isLeap ? monthDayMapping.leap : monthDayMapping.nonLeap;
        return range(1, maxDays, 1);
    }

    function getEndDateYears() {
        let currentYear = new Date().getFullYear();
        return range(parseInt(startDate.year), currentYear, 1);
    }

    function getPossibleMonths(year) {
        let currentYear = new Date().getFullYear();
        if (parseInt(year) === currentYear) {
            let currentMonth = new Date().getMonth();
            return months.filter(i => i.key <= currentMonth)
        }
        else {
            return months;
        }
    }

    function getPossibleDays(year, month) {
        let date = new Date();
        let currentYear = date.getFullYear();
        let currentMonth = date.getMonth();
        let currentDay = date.getDate();

        if (parseInt(year) === currentYear && parseInt(month) === currentMonth) {
            return getDays(year, month).filter(i => i <= currentDay);
        }
        else
            return getDays(year, month);
    }

    function getEndDateMonths() {

        let possibleMonths = getPossibleMonths(endDate.year)
        if (startDate.year === endDate.year) {
            return possibleMonths.filter(i => i.key >= startDate.month ?? 0)
        }
        else {
            return possibleMonths;
        }
    }

    function getEndDateDays() {
        if (startDate.year === endDate.year && startDate.month === endDate.month) {
            return getPossibleDays(endDate.year, endDate.month).filter(i => i >= startDate.day ?? 1)
        }
        else {
            return getPossibleDays(endDate.year, endDate.month);
        }
    }

    return (
        <div className="row">
            <div className="col">
                <div className="row mt-2 align-items-center">
                    <div className="col-2 fw-bold text-end">
                        Start Date :
                    </div>
                    <div className="col-1">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <select
                                className="form-control"
                                value={startDate.year}
                                onChange={(event) => startDateYearChangeHandler(event.target.value)}
                                disabled={startDate.year}
                            >
                                <option value=""></option>
                                {years.map(year =>
                                    <option key={year} value={year}>{year}</option>
                                )}
                            </select>
                            {
                                startDate.year &&
                                <i className="fa fa-times"
                                    style={{ marginLeft: '-16%', cursor: 'pointer' }}
                                    onClick={() => startDateYearChangeHandler('')}
                                    aria-hidden="true"></i>
                            }
                        </div>
                    </div>
                    {startDate.year &&
                        <div className="col-1">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <select
                                    className="form-control"
                                    value={startDate.month}
                                    onChange={(event) => startDateMonthChangeHandler(event.target.value)}
                                    disabled={startDate.month}
                                >
                                    <option value=""></option>
                                    {getPossibleMonths(startDate.year).map(month =>
                                        <option key={month.key} value={month.key}>{month.value}</option>
                                    )}
                                </select>
                                {startDate.month &&
                                    <span className="fa fa-times"
                                        style={{ marginLeft: '-16%', cursor: 'pointer' }}
                                        onClick={() => startDateMonthChangeHandler('')}
                                        aria-hidden="true"></span>
                                }
                            </div>
                        </div>
                    }
                    {
                        startDate.month &&
                        <div className="col-1">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <select
                                    className="form-control"
                                    value={startDate.day}
                                    onChange={(event) => startDateDayChangeHandler(event.target.value)}
                                    disabled={startDate.day}
                                >
                                    <option></option>
                                    {getPossibleDays(startDate.year, startDate.month).map(day =>
                                        <option key={day} value={day}>{day}</option>
                                    )}
                                </select>
                                {
                                    startDate.day &&
                                    <i className="fa fa-times"
                                        style={{ marginLeft: '-16%', cursor: 'pointer' }}
                                        onClick={() => startDateDayChangeHandler('')}
                                        aria-hidden="true"></i>
                                }
                            </div>
                        </div>
                    }
                </div>
                <div className="row mt-2 align-items-center">
                    <div className="col-2 fw-bold text-end">
                        End Date :
                    </div>
                    <div className="col-1">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <select
                                className="form-control"
                                value={endDate.year}
                                onChange={(event) => endDateYearChangeHandler(event.target.value)}
                                disabled={startDate.year === '' || endDate.year}
                            >
                                <option value=""></option>
                                {getEndDateYears().map(year =>
                                    <option key={year} value={year}>{year}</option>
                                )}
                            </select>
                            {
                                endDate.year &&
                                <i className="fa fa-times"
                                    style={{ marginLeft: '-16%', cursor: 'pointer' }}
                                    onClick={() => endDateYearChangeHandler('')}
                                    aria-hidden="true"></i>
                            }
                        </div>
                    </div>
                    {endDate.year &&
                        <div className="col-1">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <select
                                    className="form-control"
                                    value={endDate.month}
                                    onChange={(event) => endDateMonthChangeHandler(event.target.value)}
                                    disabled={endDate.month}
                                >
                                    <option value=""></option>
                                    {getEndDateMonths().map(month =>
                                        <option key={month.key} value={month.key}>{month.value}</option>
                                    )}
                                </select>
                                {
                                    endDate.month &&
                                    <i className="fa fa-times"
                                        style={{ marginLeft: '-16%', cursor: 'pointer' }}
                                        onClick={() => endDateMonthChangeHandler('')}
                                        aria-hidden="true"></i>
                                }
                            </div>
                        </div>
                    }
                    {
                        endDate.month &&
                        <div className="col-1">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <select
                                        className="form-control"
                                        value={endDate.day}
                                        onChange={(event) => endDateDayChangeHandler(event.target.value)}
                                        disabled={endDate.day}
                                    >
                                        <option value=""></option>
                                        {getEndDateDays().map(day =>
                                            <option key={day} value={day}>{day}</option>
                                        )}
                                    </select>
                                    {
                                        endDate.day &&
                                        <i className="fa fa-times"
                                            style={{ marginLeft: '-16%', cursor: 'pointer' }}
                                            onClick={() => endDateDayChangeHandler('')}
                                            aria-hidden="true"></i>
                                    }
                                </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}


