export const onCheckPermission = (prm) => {
    let stt = false
    const permissions = this.$cookies.get('permissions')
    const data = permissions.permissions
    data && data.map((dt) => {
        if (dt.permission_name === prm) {
            stt = true
        }
    })
    return stt
}