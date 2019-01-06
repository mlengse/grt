<template lang="pug" src='./index.pug'>
</template>

<script>
import moment from 'moment'
import 'moment/locale/id'
moment.locale('id')
export default {
    data() {
        return {
            bulan: moment().format('MMMM YYYY'),
            hari: moment.weekdays(),
            notNow: false,
            tgl: []
        }
    },
    watch: {
        bulan: {
            immediate: true,
            handler(val) {

                val !== moment().format('MMMM YYYY') ? this.notNow = true : this.notNow = false;
                this.tgl = []
                let start = moment(val, 'MMMM YYYY').startOf('month').startOf('week').add(-1, 'd')
                let end = moment(val, 'MMMM YYYY').endOf('month').endOf('week').add(-1, 'd')
                while( start <= end){
                    let dateNow = start.date()
                    this.tgl[this.tgl.length] = {
                        date: dateNow,
                        isPrev: start.isBefore(moment(val, 'MMMM YYYY'), 'month'),
                        isNow: moment(`${dateNow} ${val}`, 'DD MMMM YYYY') == moment() ? true : false,
                        isAfter: start.isAfter(moment(val, 'MMMM YYYY'), 'month'),
                    }
                    start = start.add(1, 'd')
                }
            }
        }
    },
    methods: {
        gantiBulan: function(int) {
            this.bulan = moment(this.bulan, 'MMMM YYYY').add(int, 'month').format('MMMM YYYY')
        },
        bulanIni: function() {
            this.bulan = moment().format('MMMM YYYY')
        }
    }
}
</script>
