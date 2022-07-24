<template>
    <div class="profile">
        <div class="profile-header">
            <div class="profile-fio">
                <span>{{ profile?.last_name }}</span>
                <span>{{ profile?.first_name }} {{ profile?.patronymic }}</span>
            </div>
            <span>{{ age }} лет</span>
        </div>
        <div class="profile-content">
            <div class="gradient-boxes">
                <GradientBox class="left" :value="profileLevel" title="уровень"/>
                <GradientBox :value="profileVisits" title="занятий"/>
            </div>
            <AbonementCard :subscription="subscription"/>
        </div>
        <div class="profile-contacts">
            <span class="box-header">Контактное лицо</span>
            <div class="client-box">
                <div class="client-fio">
                    <span>{{ splitClientFIO[0] }}</span>
                    <span>{{ splitClientFIO[1] }} {{ splitClientFIO[2] }}</span>
                </div>
                <a :href="`tel:${profile.client.phone}`">
                    <MyButton class="outlined">Позвонить</MyButton>
                </a>
            </div>
            <a :href="`tel:${profile.phone}`">
                <MyButton class="phone-btn">
                    <img class="left" src="@/assets/icons/Phone.svg">
                    <span>Позвонить</span>
                </MyButton>
            </a>
        </div>
    </div>
</template>

<script>
import dateMixin from '@/mixins/dateMixin';
import GradientBox from '@/components/GradientBox.vue';
import AbonementCard from '@/components/AbonementCard.vue'

export default {
    name: "ProfileInfo",
    mixins: [dateMixin],
    components: {
        GradientBox,
        AbonementCard
    },
    props: {
        profile: {
            type: Object,
            required: true
        },
        subscription: {
            type: Object
        }
    },
    data() {
        return {
            attendings: []
        }
    },
    computed: {
        age() {
            return this.currentDate.getFullYear() - this.convertStringToDate(this.profile.birth_date).getFullYear();
        },
        splitClientFIO() {
            if(this.profile?.client) {
                let el = this.profile.client.fio.split(' ');
                return el;
            } else return '';
        },
        profileLevel() {
            if(this.profileVisits < 5) {
                return 1;
            } else if(this.profileVisits < 10) {
                return 2;
            } else return 3;
        },
        profileVisits() {
            return this.attendings.length;
        },
    },
    methods: {
        async fetchAttendings() {
            try {
                const response = await this.$axios.get(`profiles/${this.profile.id}/attendings`, { params: {
                    _expand: 'training'
                }});
                this.attendings = response.data.filter(attending => attending.training.typeId == 1);
            } catch (error) {
                alert("Ошибка! " + error);
            }
        }
    },
    created() {
        this.fetchAttendings();
    }
}
</script>

<style lang="scss" scoped>
    @import '@/styles/colors';

    %container {
        display: flex;
        flex-direction: column;
    }

    %cera-pro-bold {
        font-weight: bold;
    }

    .profile {
        margin: 0 20px;
        
        .profile-header {
            @extend %container;
            align-items: center;

            .profile-fio{
                @extend %container;
                @extend %cera-pro-bold;
                align-items: center;
                margin-bottom: 10px;
            }
        }

        .profile-content {
            @extend %container;
            margin: 30px 0;

            .gradient-boxes {
                display: flex;
                margin-bottom: 20px;
            }
        }

        .profile-contacts {
            @extend %container;
            font-size: 14px;

            .box-header {
                margin-bottom: 10px;
                color: $box-title;
            }

            .client-box {
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;

                .client-fio {
                    @extend %container;
                    @extend %cera-pro-bold;
                }

                .outlined {
                    font-size: 12px;
                    padding: 13px;
                }
            }

            .phone-btn {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: row;
                width: 100%;
            }
        }
    }

    .left {
        margin-right: 10px;
    }
</style>