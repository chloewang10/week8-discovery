import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
    extends: Bar,
    data: function () {
        return {
            firebasedata: new Object(),
            datacollection: {
                labels: [],
                datasets: [{
                    label: "Total Number of Orders",
                    backgroundColor: ["#B71C1C", "#F57F17", "#FFEE58", "#00838F", "#01579B", "#7C4DFF"],
                    data: [],
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Total Number of Each Dish'
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0
                        }
                    }],

                }
            }
        }
    },
    methods: {
        fetchItems: function () {
            var allOrders = []
            var orderAmounts = {}
            database.collection('orders').get()
                .then(querySnapShot => {
                    querySnapShot.forEach(doc => {
                        this.firebasedata = doc.data()
                        var orderTotal = {}

                        for (let i in this.firebasedata) {
                            orderTotal[i] = this.firebasedata[i]
                        }
                        allOrders.push(orderTotal)
                    })

                    for (let j in allOrders[0]) {
                        this.datacollection.labels.push(j)
                        orderAmounts[j] = 0
                    }

                    for (var p = 0; p < allOrders.length; p++) {
                        for (let k in allOrders[p]) {
                            orderAmounts[k] += allOrders[p][k]
                        }
                    }

                    for (let l in orderAmounts) {
                        this.datacollection.datasets[0].data.push(orderAmounts[l])
                    }
                    this.renderChart(this.datacollection, this.options)
                })
        }
    },
    created() {
        this.fetchItems()
    }
}