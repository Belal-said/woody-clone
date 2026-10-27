export const navigation = [
    {
        name: "Home",
        path: "/home",
        roles: [
            "admin",
            "manager",
            "employee"
        ]
    },
    {
        name: "Tips",
        path: "/tips",
        roles: [
            "admin",
            "manager",
            "employee"
        ],
        permissions: [
            "tips:view",
            "tips:write",
            "tips:employees"
        ]
    },
    {
        name: "Sales",
        path: "/sales",
        roles: [
            "admin",
            "manager"
        ],
        permissions: [
            "sales:view"
        ]
    },
    {
        name: "Commissions",
        path: "/commissions",
        roles: [
            "admin",
            "manager"
        ],
        permissions: [
            "commissions:view"
        ]
    },
    {
        name: "Checklists",
        path: "/checklists",
        roles: [
            "admin",
            "manager",
            "employee"
        ],
        permissions: [
            "checklists:view"
        ]
    },
    {
        name: "Cash Drops",
        path: "/cashdrops",
        roles: [
            "admin",
            "manager"
        ],
        permissions: [
            "finance:cash-drops"
        ]
    },
    {
        name: "Safe Count",
        path: "/safecount",
        roles: [
            "admin",
            "manager"
        ],
        permissions: [
            "safe-count:manage"
        ]
    },
    {
        name: "Dashboards",
        path: "/dashboards",
        roles: [
            "admin",
            "manager"
        ]
    },
    {
        name: "new Dash",
        path: "/newdash",
        roles: [
            "admin",
            "manager",
            "employee"
        ],
        custom: true
    }
];
