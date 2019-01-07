import moment from 'moment'
import 'moment/locale/id'
moment.locale('id')
export default {
    data() {
        return {
            bulan: '',
            hari: moment.weekdays(),
            sekarang: moment().format('DD-MM-YYYY'),
            before: false,
            after: false,
            tgl: []
        }
    },
    watch: {
        bulan: {
            immediate: true,
            handler(val) {
                if(val === '') {
                    this.bulan = moment().format('MMMM YYYY')
                    this.before = false,
                    this.after = false
                }

                if(moment(val, 'MMMM YYYY').isBefore(moment(), 'month')) {
                    this.before = true
                    this.after = false
                } else if(moment(val, 'MMMM YYYY').isAfter(moment(), 'month')) {
                    this.before = false
                    this.after = true
                } else {
                    this.before = false
                    this.after = false
                }
                this.tgl = []
                let start = moment(val, 'MMMM YYYY').startOf('month').startOf('week').add(-1, 'd')
                let end = moment(val, 'MMMM YYYY').endOf('month').endOf('week').add(-1, 'd')
                while( start <= end){
                    let dateNow = start.date()
                    this.tgl[this.tgl.length] = {
                        date: dateNow,
                        isPrev: start.isBefore(moment(val, 'MMMM YYYY'), 'month'),
                        isNow: moment(`${dateNow} ${val}`, 'DD MMMM YYYY').format('DD-MM-YYYY') == this.sekarang ? true : false,
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
