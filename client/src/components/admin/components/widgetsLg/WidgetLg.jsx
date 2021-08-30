import React from 'react'
import './widgetLg.css'

export default function WidgetLg() {
    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Transactions</h3>
            <table className="widgetLgTable">
                <tr className="widgetLgTr">
                    <th className="Th">Customer</th>
                    <th className="Th">Buyer</th>
                    <th className="Th">Date</th>
                    <th className="Th">Amount</th>
                </tr>
                <tr className="widgetLgTr">
                    <td className="Td1">Ruvidu</td>
                    <td className="Td2">Walpita</td>
                    <td className="Td3">22.09.2021</td>
                    <td className="Td4">Rs.1000</td>
                </tr>
                <tr className="widgetLgTr">
                    <td className="Td1">Ruvidu</td>
                    <td className="Td2">Dilshan</td>
                    <td className="Td3">22.09.2021</td>
                    <td className="Td4">Rs.5000</td>
                </tr>
            </table>
        </div>
    )
}
