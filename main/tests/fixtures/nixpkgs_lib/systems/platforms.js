import { createRuntime, createFunc } from "../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default //
//
//
//
//
//


// args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
        nixScope["bluefield2"] = ({"gcc": ({"arch": "armv8-a+fp+simd+crc+crypto"})});
        nixScope["armv7a-android"] = (function(){
        const obj = {};
        obj["gcc"] = ({"arch": "armv7-a", "float-abi": "softfp", "fpu": "vfpv3-d16"});
        if (obj["linux-kernel"] === undefined) obj["linux-kernel"] = {};
        obj["linux-kernel"]["name"] = "armeabi-v7a";
        return obj;
    })();
        nixScope["apple-m1"] = ({"gcc": ({"arch": "armv8.3-a+crypto+sha2+aes+crc+fp16+lse+simd+ras+rdm+rcpc", "cpu": "apple-a13"})});
        nixScope["ben_nanonote"] = ({"linux-kernel": ({"name": "ben_nanonote"}), "gcc": ({"arch": "mips32", "float": "soft"})});
        nixScope["gcc_mips32r2_o32"] = ({"gcc": ({"arch": "mips32r2", "abi": "32"})});
        nixScope["gcc_mips32r6_o32"] = ({"gcc": ({"arch": "mips32r6", "abi": "32"})});
        nixScope["gcc_mips64r2_n32"] = ({"gcc": ({"arch": "mips64r2", "abi": "n32"})});
        nixScope["gcc_mips64r6_n32"] = ({"gcc": ({"arch": "mips64r6", "abi": "n32"})});
        nixScope["gcc_mips64r2_64"] = ({"gcc": ({"arch": "mips64r2", "abi": "64"})});
        nixScope["gcc_mips64r6_64"] = ({"gcc": ({"arch": "mips64r6", "abi": "64"})});
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "pc", {enumerable: true, get(){return ({"linux-kernel": ({"name": "pc", "baseConfig": "defconfig", "autoModules": true, "target": "bzImage"})});}});
            Object.defineProperty(nixScope, "pc_simplekernel", {enumerable: true, get(){return nixScope["lib"]["recursiveUpdate"](nixScope["pc"])((function(){
        const obj = {};
        if (obj["linux-kernel"] === undefined) obj["linux-kernel"] = {};
        obj["linux-kernel"]["autoModules"] = false;
        return obj;
    })());}});
            Object.defineProperty(nixScope, "powernv", {enumerable: true, get(){return ({"linux-kernel": ({"name": "PowerNV", "baseConfig": "powernv_defconfig", "target": "vmlinux", "autoModules": true, "extraConfig": `
            PPC_64K_PAGES n
            PPC_4K_PAGES y
            IPV6 y
    
            ATA_BMDMA y
            ATA_SFF y
            VIRTIO_MENU y
          `})});}});
            Object.defineProperty(nixScope, "pogoplug4", {enumerable: true, get(){return ({"linux-kernel": ({"name": "pogoplug4", "baseConfig": "multi_v5_defconfig", "autoModules": false, "extraConfig": `
            # Ubi for the mtd
            MTD_UBI y
            UBIFS_FS y
            UBIFS_FS_XATTR y
            UBIFS_FS_ADVANCED_COMPR y
            UBIFS_FS_LZO y
            UBIFS_FS_ZLIB y
            UBIFS_FS_DEBUG n
          `, "makeFlags": ["LOADADDR=0x8000"], "target": "uImage"}), "gcc": ({"arch": "armv5te"})});}});
            Object.defineProperty(nixScope, "sheevaplug", {enumerable: true, get(){return ({"linux-kernel": ({"name": "sheevaplug", "baseConfig": "multi_v5_defconfig", "autoModules": false, "extraConfig": `
            BLK_DEV_RAM y
            BLK_DEV_INITRD y
            BLK_DEV_CRYPTOLOOP m
            BLK_DEV_DM m
            DM_CRYPT m
            MD y
            REISERFS_FS m
            BTRFS_FS m
            XFS_FS m
            JFS_FS m
            EXT4_FS m
            USB_STORAGE_CYPRESS_ATACB m
    
            # mv cesa requires this sw fallback, for mv-sha1
            CRYPTO_SHA1 y
            # Fast crypto
            CRYPTO_TWOFISH y
            CRYPTO_TWOFISH_COMMON y
            CRYPTO_BLOWFISH y
            CRYPTO_BLOWFISH_COMMON y
    
            IP_PNP y
            IP_PNP_DHCP y
            NFS_FS y
            ROOT_NFS y
            TUN m
            NFS_V4 y
            NFS_V4_1 y
            NFS_FSCACHE y
            NFSD m
            NFSD_V2_ACL y
            NFSD_V3 y
            NFSD_V3_ACL y
            NFSD_V4 y
            NETFILTER y
            IP_NF_IPTABLES y
            IP_NF_FILTER y
            IP_NF_MATCH_ADDRTYPE y
            IP_NF_TARGET_LOG y
            IP_NF_MANGLE y
            IPV6 m
            VLAN_8021Q m
    
            CIFS y
            CIFS_XATTR y
            CIFS_POSIX y
            CIFS_FSCACHE y
            CIFS_ACL y
    
            WATCHDOG y
            WATCHDOG_CORE y
            ORION_WATCHDOG m
    
            ZRAM m
            NETCONSOLE m
    
            # Disable OABI to have seccomp_filter (required for systemd)
            # https://github.com/raspberrypi/firmware/issues/651
            OABI_COMPAT n
    
            # Fail to build
            DRM n
            SCSI_ADVANSYS n
            USB_ISP1362_HCD n
            SND_SOC n
            SND_ALI5451 n
            FB_SAVAGE n
            SCSI_NSP32 n
            ATA_SFF n
            SUNGEM n
            IRDA n
            ATM_HE n
            SCSI_ACARD n
            BLK_DEV_CMD640_ENHANCED n
    
            FUSE_FS m
    
            # systemd uses cgroups
            CGROUPS y
    
            # Latencytop
            LATENCYTOP y
    
            # Ubi for the mtd
            MTD_UBI y
            UBIFS_FS y
            UBIFS_FS_XATTR y
            UBIFS_FS_ADVANCED_COMPR y
            UBIFS_FS_LZO y
            UBIFS_FS_ZLIB y
            UBIFS_FS_DEBUG n
    
            # Kdb, for kernel troubles
            KGDB y
            KGDB_SERIAL_CONSOLE y
            KGDB_KDB y
          `, "makeFlags": ["LOADADDR=0x0200000"], "target": "uImage", "DTB": true}), "gcc": ({"arch": "armv5te"})});}});
            Object.defineProperty(nixScope, "raspberrypi", {enumerable: true, get(){return ({"linux-kernel": ({"name": "raspberrypi", "baseConfig": "bcm2835_defconfig", "DTB": true, "autoModules": true, "preferBuiltin": true, "extraConfig": `
            # Disable OABI to have seccomp_filter (required for systemd)
            # https://github.com/raspberrypi/firmware/issues/651
            OABI_COMPAT n
          `, "target": "zImage"}), "gcc": ({"arch": "armv6kz", "fpu": "vfpv2"})});}});
            Object.defineProperty(nixScope, "raspberrypi2", {enumerable: true, get(){return nixScope["armv7l-hf-multiplatform"];}});
            Object.defineProperty(nixScope, "zero-gravitas", {enumerable: true, get(){return ({"linux-kernel": ({"name": "zero-gravitas", "baseConfig": "zero-gravitas_defconfig", "target": "zImage", "autoModules": false, "DTB": true}), "gcc": ({"fpu": "neon", "cpu": "cortex-a9"})});}});
            Object.defineProperty(nixScope, "zero-sugar", {enumerable: true, get(){return ({"linux-kernel": ({"name": "zero-sugar", "baseConfig": "zero-sugar_defconfig", "DTB": true, "autoModules": false, "preferBuiltin": true, "target": "zImage"}), "gcc": ({"cpu": "cortex-a7", "fpu": "neon-vfpv4", "float-abi": "hard"})});}});
            Object.defineProperty(nixScope, "utilite", {enumerable: true, get(){return ({"linux-kernel": ({"name": "utilite", "maseConfig": "multi_v7_defconfig", "autoModules": false, "extraConfig": `
            # Ubi for the mtd
            MTD_UBI y
            UBIFS_FS y
            UBIFS_FS_XATTR y
            UBIFS_FS_ADVANCED_COMPR y
            UBIFS_FS_LZO y
            UBIFS_FS_ZLIB y
            UBIFS_FS_DEBUG n
          `, "makeFlags": ["LOADADDR=0x10800000"], "target": "uImage", "DTB": true}), "gcc": ({"cpu": "cortex-a9", "fpu": "neon"})});}});
            Object.defineProperty(nixScope, "guruplug", {enumerable: true, get(){return nixScope["lib"]["recursiveUpdate"](nixScope["sheevaplug"])((function(){
        const obj = {};
        if (obj["linux-kernel"] === undefined) obj["linux-kernel"] = {};
        obj["linux-kernel"]["baseConfig"] = "guruplug_defconfig";
        return obj;
    })());}});
            Object.defineProperty(nixScope, "beaglebone", {enumerable: true, get(){return nixScope["lib"]["recursiveUpdate"](nixScope["armv7l-hf-multiplatform"])(({"linux-kernel": ({"name": "beaglebone", "baseConfig": "bb.org_defconfig", "autoModules": false, "extraConfig": "", "target": "zImage"})}));}});
            Object.defineProperty(nixScope, "armv7l-hf-multiplatform", {enumerable: true, get(){return ({"linux-kernel": ({"name": "armv7l-hf-multiplatform", "Major": "2.6", "baseConfig": "multi_v7_defconfig", "DTB": true, "autoModules": true, "preferBuiltin": true, "target": "zImage", "extraConfig": `
            # Serial port for Raspberry Pi 3. Wasn't included in ARMv7 defconfig
            # until 4.17.
            SERIAL_8250_BCM2835AUX y
            SERIAL_8250_EXTENDED y
            SERIAL_8250_SHARE_IRQ y
    
            # Hangs ODROID-XU4
            ARM_BIG_LITTLE_CPUIDLE n
    
            # Disable OABI to have seccomp_filter (required for systemd)
            # https://github.com/raspberrypi/firmware/issues/651
            OABI_COMPAT n
    
            # >=5.12 fails with:
            # drivers/net/ethernet/micrel/ks8851_common.o: in function \`ks8851_probe_common':
            # ks8851_common.c:(.text+0x179c): undefined reference to \`__this_module'
            # See: https://lore.kernel.org/netdev/20210116164828.40545-1-marex@denx.de/T/
            KS8851_MLL y
          `}), "gcc": ({"arch": "armv7-a", "fpu": "vfpv3-d16"})});}});
            Object.defineProperty(nixScope, "aarch64-multiplatform", {enumerable: true, get(){return ({"linux-kernel": ({"name": "aarch64-multiplatform", "baseConfig": "defconfig", "DTB": true, "autoModules": true, "preferBuiltin": true, "extraConfig": `
            # Raspberry Pi 3 stuff. Not needed for   s >= 4.10.
            ARCH_BCM2835 y
            BCM2835_MBOX y
            BCM2835_WDT y
            RASPBERRYPI_FIRMWARE y
            RASPBERRYPI_POWER y
            SERIAL_8250_BCM2835AUX y
            SERIAL_8250_EXTENDED y
            SERIAL_8250_SHARE_IRQ y
    
            # Cavium ThunderX stuff.
            PCI_HOST_THUNDER_ECAM y
    
            # Nvidia Tegra stuff.
            PCI_TEGRA y
    
            # The default (=y) forces us to have the XHCI firmware available in initrd,
            # which our initrd builder can't currently do easily.
            USB_XHCI_TEGRA m
          `, "target": "Image"}), "gcc": ({"arch": "armv8-a"})});}});
            Object.defineProperty(nixScope, "fuloong2f_n32", {enumerable: true, get(){return ({"linux-kernel": ({"name": "fuloong2f_n32", "baseConfig": "lemote2f_defconfig", "autoModules": false, "extraConfig": `
            MIGRATION n
            COMPACTION n
    
            # nixos mounts some cgroup
            CGROUPS y
    
            BLK_DEV_RAM y
            BLK_DEV_INITRD y
            BLK_DEV_CRYPTOLOOP m
            BLK_DEV_DM m
            DM_CRYPT m
            MD y
            REISERFS_FS m
            EXT4_FS m
            USB_STORAGE_CYPRESS_ATACB m
    
            IP_PNP y
            IP_PNP_DHCP y
            IP_PNP_BOOTP y
            NFS_FS y
            ROOT_NFS y
            TUN m
            NFS_V4 y
            NFS_V4_1 y
            NFS_FSCACHE y
            NFSD m
            NFSD_V2_ACL y
            NFSD_V3 y
            NFSD_V3_ACL y
            NFSD_V4 y
    
            # Fail to build
            DRM n
            SCSI_ADVANSYS n
            USB_ISP1362_HCD n
            SND_SOC n
            SND_ALI5451 n
            FB_SAVAGE n
            SCSI_NSP32 n
            ATA_SFF n
            SUNGEM n
            IRDA n
            ATM_HE n
            SCSI_ACARD n
            BLK_DEV_CMD640_ENHANCED n
    
            FUSE_FS m
    
            # Needed for udev >= 150
            SYSFS_DEPRECATED_V2 n
    
            VGA_CONSOLE n
            VT_HW_CONSOLE_BINDING y
            SERIAL_8250_CONSOLE y
            FRAMEBUFFER_CONSOLE y
            EXT2_FS y
            EXT3_FS y
            REISERFS_FS y
            MAGIC_SYSRQ y
    
            # The kernel doesn't boot at all, with FTRACE
            FTRACE n
          `, "target": "vmlinux"}), "gcc": ({"arch": "loongson2f", "float": "hard", "abi": "n32"})});}});
            Object.defineProperty(nixScope, "mips64el-qemu-linux-gnuabi64", {enumerable: true, get(){return ({"linux-kernel": ({"name": "mips64el", "baseConfig": "64r2el_defconfig", "target": "vmlinuz", "autoModules": false, "DTB": true, "extraConfig": `
            MIPS_MALTA y
            PAGE_SIZE_4KB y
            CPU_LITTLE_ENDIAN y
            CPU_MIPS64_R2 y
            64BIT y
            CPU_MIPS64_R2 y
    
            NET_9P y
            NET_9P_VIRTIO y
            9P_FS y
            9P_FS_POSIX_ACL y
            PCI y
            VIRTIO_PCI y
          `})});}});
            Object.defineProperty(nixScope, "riscv-multiplatform", {enumerable: true, get(){return ({"linux-kernel": ({"name": "riscv-multiplatform", "target": "Image", "autoModules": true, "preferBuiltin": true, "baseConfig": "defconfig", "DTB": true})});}});
            Object.defineProperty(nixScope, "loongarch64-multiplatform", {enumerable: true, get(){return ({"gcc": ({"arch": "la64v1.0", "strict-align": false, "cmodel": "medium"}), "linux-kernel": ({"name": "loongarch-multiplatform", "target": "vmlinuz.efi", "autoModules": true, "preferBuiltin": true, "baseConfig": "defconfig", "DTB": true})});}});
            Object.defineProperty(nixScope, "select", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["platform"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["platform"]["isx86"], ()=>(nixScope["pc"]), ()=>((operators.ifThenElse(nixScope["platform"]["isAarch32"], ()=>((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "version", {enumerable: true, get(){return operators.selectOrDefault(nixScope["platform"], ["parsed", "cpu", "version"], null);}});
            return (operators.ifThenElse(operators.equal(nixScope["version"], null), ()=>(nixScope["pc"]), ()=>((operators.ifThenElse(nixScope["lib"]["versionOlder"](nixScope["version"])("6"), ()=>(nixScope["sheevaplug"]), ()=>((operators.ifThenElse(nixScope["lib"]["versionOlder"](nixScope["version"])("7"), ()=>(nixScope["raspberrypi"]), ()=>(nixScope["armv7l-hf-multiplatform"])))))))));
        } finally {
            runtime.scopeStack.pop();
        }
    })()), ()=>((operators.ifThenElse(nixScope["platform"]["isAarch64"], ()=>((operators.ifThenElse(nixScope["platform"]["isDarwin"], ()=>(nixScope["apple-m1"]), ()=>(nixScope["aarch64-multiplatform"])))), ()=>((operators.ifThenElse(nixScope["platform"]["isLoongArch64"], ()=>(nixScope["loongarch64-multiplatform"]), ()=>((operators.ifThenElse(nixScope["platform"]["isRiscV"], ()=>(nixScope["riscv-multiplatform"]), ()=>((operators.ifThenElse(operators.equal(nixScope["platform"]["parsed"]["cpu"], nixScope["lib"]["systems"]["parse"]["cpuTypes"]["mipsel"]), ()=>((nixScope["import"]((new Path(["./examples.nix"], [])))(({"lib": nixScope["lib"]})))["mipsel-linux-gnu"]), ()=>((operators.ifThenElse(operators.equal(nixScope["platform"]["parsed"]["cpu"], nixScope["lib"]["systems"]["parse"]["cpuTypes"]["powerpc64le"]), ()=>(nixScope["powernv"]), ()=>((operators.ifThenElse(nixScope["platform"]["isLoongArch64"], ()=>(nixScope["loongarch64-multiplatform"]), ()=>({})))))))))))))))))))))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return nixScope;
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))