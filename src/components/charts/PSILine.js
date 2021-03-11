import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
    extends: Line,
    data: function () {
        return {
            results: [],
            datacollection: {
                labels: [],
                backgroundColor: ["#00838F", "#01579B", "#7C4DFF"],
                datasets: [
                    { data: [], label: "west", borderColor: "#B71C1C", fill: false },
                    { data: [], label: "national", borderColor: "#F57F17", fill: false },
                    { data: [], label: "east", borderColor: "#FFEE58", fill: false },
                    { data: [], label: "central", borderColor: "#00838F", fill: false },
                    { data: [], label: "south", borderColor: "#01579B", fill: false },
                    { data: [], label: "north", borderColor: "#7C4DFF", fill: false },
                ]
            },
            options: {
                legend: { display: true },
                title: {
                    display: true,
                    text: 'PSI Twenty Four Hourly (By Region)',

                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        fetchItems: function () {
            axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
                .then(response => {
                    this.results = response.data.items

                    for (var i = 0; i < this.results.length; i++) {
                        for (let j in this.results[i]) {
                            if (j === "timestamp") {
                                this.datacollection.labels.push(this.results[i][j])
                            }
                            if (j === "readings") {
                                for (let k in this.results[i][j]) {
                                    if (k === "psi_twenty_four_hourly") {

                                        for (let l in this.results[i][j][k]) {

                                            if (l === "west") {
                                                this.datacollection.datasets[0].data.push(this.results[i][j][k][l])
                                            }

                                            if (l === "national") {
                                                this.datacollection.datasets[1].data.push(this.results[i][j][k][l])

                                            }

                                            if (l === "east") {
                                                this.datacollection.datasets[2].data.push(this.results[i][j][k][l])

                                            }

                                            if (l === "central") {
                                                this.datacollection.datasets[3].data.push(this.results[i][j][k][l])

                                            }

                                            if (l === "south") {
                                                this.datacollection.datasets[4].data.push(this.results[i][j][k][l])

                                            }

                                            if (l === "north") {
                                                this.datacollection.datasets[5].data.push(this.results[i][j][k][l])

                                            }
                                        }



                                    }
                                }
                            }


                        }
                    }

                    this.renderChart(this.datacollection, this.options)
                })

        }
    },
    created() {
        this.fetchItems()
    }
}