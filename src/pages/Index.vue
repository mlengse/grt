<template lang="pug">
.calendar.calendar-lg
    .calendar-nav.navbar
        button.btn.btn-action.btn-link.btn-lg
            i.icon.icon-arrow-left(@click="gantiBulan('-1')")
        .navbar-primary 
            | {{ bulan }}
            button.btn.btn-action.btn-link.btn-lg(v-if='notNow' @click='bulanIni')
                i.icon.icon-time
        button.btn.btn-action.btn-link.btn-lg(@click='gantiBulan("1")')
            i.icon.icon-arrow-right
    .calendar-container
        .calendar-header
            .calendar-date(v-for='ha of hari') {{ha}}
        .calendar-body
            .calendar-date(
                v-for='tg of tgl'
                :class="{'prev-month': tg.isPrev, 'next-month': tg.isAfter}" 
            )
                button.date-item(:class="{'date-today': tg.isNow}")  {{tg.date}}
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
                        isNow: dateNow == moment().date() ? true : false,
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
