export const categories = {
    officers: {
        id: 'SO',
        title: 'Student Officers',
        // @ts-expect-error
        innertabs: this.studentofficers.split('|')
    },
    network: {
        id: 'NO',
        title: 'Network Officers',
        // @ts-expect-error
        innertabs: this.networkofficers.split('|')
    },
    nus: {
        id: 'NUS',
        title: 'NUS Delegate',
        innertabs: 'NUS National Conference Delegate',
    },
    academic: {
        id: 'ACADEMIC',
        title: 'Academic',
        // @ts-expect-error
        innertabs: this.academicgroups.split('|')
    }
};
