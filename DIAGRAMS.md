# UML Diagrams - Text-Based Representations

This document contains text-based UML diagrams that can be viewed in any markdown viewer.

## 1. Use Case Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Gymkhana Portal                           │
│                                                              │
│  ┌──────────────┐              ┌──────────────┐            │
│  │   Student    │              │    Admin     │            │
│  └──────┬───────┘              └──────┬───────┘            │
│         │                              │                    │
│         ├─ Register Account            │                    │
│         ├─ Login ◄─────────────────────┤                    │
│         ├─ View Events                 │                    │
│         ├─ Register for Event          │                    │
│         ├─ Book Facility               │                    │
│         ├─ View Bookings               │                    │
│         ├─ View Club Information       │                    │
│         │                              │                    │
│         │                              ├─ View All Bookings │
│         │                              ├─ Approve Booking   │
│         │                              ├─ Reject Booking    │
│         │                              ├─ View Statistics   │
│         │                              └─ View Registrations│
│                                                              │
└─────────────────────────────────────────────────────────────┘

Legend:
  ────  : Use case
  ◄──── : Extends/Includes relationship
```

## 2. Class Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         User                                 │
├─────────────────────────────────────────────────────────────┤
│ - id: number                                                 │
│ - name: string                                               │
│ - email: string                                              │
│ - password: string (hashed)                                  │
│ - rollNumber: string                                         │
│ - isAdmin: boolean                                           │
│ - createdAt: Date                                            │
└────────────┬────────────────────────────────────────────────┘
             │
             │ creates (1 to many)
             │
┌────────────▼────────────────────────────────────────────────┐
│                       Booking                                │
├─────────────────────────────────────────────────────────────┤
│ - id: number                                                 │
│ - userId: number (FK)                                        │
│ - name: string                                               │
│ - rollNumber: string                                         │
│ - facility: string                                           │
│ - date: Date                                                 │
│ - timeSlot: string                                           │
│ - purpose: string                                            │
│ - status: enum (pending/approved/rejected)                   │
│ - createdAt: Date                                            │
└──────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                         Event                                │
├─────────────────────────────────────────────────────────────┤
│ - id: number                                                 │
│ - club: string                                               │
│ - title: string                                              │
│ - date: string                                               │
│ - venue: string                                              │
│ - registered: number                                         │
│ - description: string                                        │
│ - createdAt: Date                                            │
└────────────┬────────────────────────────────────────────────┘
             │
             │ has (1 to many)
             │
┌────────────▼────────────────────────────────────────────────┐
│                  EventRegistration                           │
├─────────────────────────────────────────────────────────────┤
│ - id: number                                                 │
│ - eventId: number (FK)                                       │
│ - userId: number (FK, nullable)                              │
│ - name: string                                               │
│ - rollNumber: string                                         │
│ - eventTitle: string                                         │
│ - registeredOn: Date                                         │
│ - createdAt: Date                                            │
└──────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      TeamMember                              │
├─────────────────────────────────────────────────────────────┤
│ - id: number                                                 │
│ - name: string                                               │
│ - role: string                                               │
│ - year: string                                               │
│ - sport/domain: string                                       │
│ - phone: string                                              │
│ - email: string                                              │
│ - github/instagram: string                                   │
└──────────────────────────────────────────────────────────────┘

Relationships:
  User ──(1)──< creates >──(many)── Booking
  User ──(1)──< registers >──(many)── EventRegistration
  Event ──(1)──< has >──(many)── EventRegistration
  Event ──(many)──< belongs to >──(1)── Club
  Club ──(1)──< has >──(many)── TeamMember
```

## 3. Sequence Diagram - Booking Flow

```
User          Frontend        API Service    Express Route    Auth Middleware    Controller    Database
  │               │                │               │                │                │             │
  │──Fill Form───>│                │               │                │                │             │
  │               │                │               │                │                │             │
  │               │──POST /bookings──>│               │                │                │             │
  │               │                │               │                │                │             │
  │               │                │──Forward──>│               │                │             │
  │               │                │               │                │                │             │
  │               │                │               │──Validate Token──>│                │             │
  │               │                │               │                │                │             │
  │               │                │               │                │──Verify JWT──>│             │
  │               │                │               │                │                │             │
  │               │                │               │<──User Auth───│                │             │
  │               │                │               │                │                │             │
  │               │                │               │──Process──>│                │             │
  │               │                │               │                │                │             │
  │               │                │               │                │──Check Conflicts──>│             │
  │               │                │               │                │                │             │
  │               │                │               │                │                │──Query──>│
  │               │                │               │                │                │<──Results─│
  │               │                │               │                │                │             │
  │               │                │               │                │<──No Conflict───│             │
  │               │                │               │                │                │             │
  │               │                │               │                │──Save Booking──>│             │
  │               │                │               │                │                │             │
  │               │                │               │                │                │──Save──>│
  │               │                │               │                │                │<──Saved───│
  │               │                │               │                │                │             │
  │               │                │               │<──Success─────│                │             │
  │               │                │               │                │                │             │
  │               │                │<──JSON Response───────────────│                │             │
  │               │                │               │                │                │             │
  │               │<──Update UI────│               │                │                │             │
  │               │                │               │                │                │             │
  │<──Success Msg─│                │               │                │                │             │
  │               │                │               │                │                │             │
```

## 4. Activity Diagram - Event Registration

```
                    START
                      │
                      ▼
            ┌─────────────────────┐
            │ Visit Event Page    │
            └──────────┬──────────┘
                       │
                       ▼
            ┌─────────────────────┐
            │ Fill Registration   │
            │      Form           │
            └──────────┬──────────┘
                       │
                       ▼
            ┌─────────────────────┐
            │   Submit Form       │
            └──────────┬──────────┘
                       │
                       ▼
            ┌─────────────────────┐
            │  Form Valid?        │
            └─────┬───────────┬───┘
                  │ NO        │ YES
                  │           │
        ┌─────────▼───┐       │
        │ Show Error  │       │
        │   Message   │       │
        └─────────────┘       │
                  │           │
                  └───STOP    │
                              │
                              ▼
            ┌─────────────────────┐
            │  Send API Request   │
            └──────────┬──────────┘
                       │
                       ▼
            ┌─────────────────────┐
            │ Already Registered? │
            └─────┬───────────┬───┘
                  │ YES       │ NO
                  │           │
        ┌─────────▼───┐       │
        │ Show Error: │       │
        │  Already    │       │
        │ Registered  │       │
        └─────────────┘       │
                  │           │
                  └───STOP    │
                              │
                              ▼
            ┌─────────────────────┐
            │  Save Registration  │
            └──────────┬──────────┘
                       │
                       ▼
            ┌─────────────────────┐
            │ Update Event Count  │
            └──────────┬──────────┘
                       │
                       ▼
            ┌─────────────────────┐
            │ Show Success Message│
            └──────────┬──────────┘
                       │
                       ▼
                     STOP
```

## 5. System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                                │
│                    (Port 5173)                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    React Frontend                         │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │   │
│  │  │   Pages    │  │ Components │  │  Services  │         │   │
│  │  │            │  │            │  │            │         │   │
│  │  │ - Home     │  │ - Navbar   │  │ - API      │         │   │
│  │  │ - Login    │  │            │  │   Service  │         │   │
│  │  │ - Booking  │  │            │  │            │         │   │
│  │  │ - Admin    │  │            │  │            │         │   │
│  │  │ - Events   │  │            │  │            │         │   │
│  │  │ - Clubs    │  │            │  │            │         │   │
│  │  └────────────┘  └────────────┘  └────────────┘         │   │
│  └──────────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ HTTP/REST API
                            │ (JSON)
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│                    APPLICATION LAYER                             │
│                    (Port 5001)                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                  Express Backend                          │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │   │
│  │  │   Routes   │  │ Middleware │  │  Business  │         │   │
│  │  │            │  │            │  │   Logic    │         │   │
│  │  │ - Auth     │  │ - Auth     │  │ - Booking  │         │   │
│  │  │ - Bookings │  │ - Admin    │  │   Logic    │         │   │
│  │  │ - Events   │  │            │  │ - Event    │         │   │
│  │  │ - Clubs    │  │            │  │   Logic    │         │   │
│  │  │ - Admin    │  │            │  │ - Conflict │         │   │
│  │  └────────────┘  └────────────┘  │   Check    │         │   │
│  │                                   └────────────┘         │   │
│  └──────────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ File I/O
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│                       DATA LAYER                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              JSON File Database                           │   │
│  │  ┌────────────────────────────────────────────────────┐   │   │
│  │  │          database.json                              │   │   │
│  │  │  - users[]                                          │   │   │
│  │  │  - bookings[]                                       │   │   │
│  │  │  - events[]                                         │   │   │
│  │  │  - eventRegistrations[]                             │   │   │
│  │  │  - teamMembers{}                                    │   │   │
│  │  └────────────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## 6. Database ER Diagram (Text)

```
┌──────────────┐
│     User     │
├──────────────┤
│ PK id        │
│    name      │
│    email     │
│    password  │
│    rollNumber│
│    isAdmin   │
│    createdAt │
└──────┬───────┘
       │
       │ 1
       │
       │ creates
       │
       │ many
       │
┌──────▼───────┐
│   Booking    │
├──────────────┤
│ PK id        │
│ FK userId    │────┐
│    name      │    │
│    rollNumber│    │
│    facility  │    │
│    date      │    │
│    timeSlot  │    │
│    purpose   │    │
│    status    │    │
│    createdAt │    │
└──────────────┘    │
                    │
                    │
┌──────────────┐    │
│    Event     │    │
├──────────────┤    │
│ PK id        │    │
│    club      │    │
│    title     │    │
│    date      │    │
│    venue     │    │
│    registered│    │
│    description│   │
│    createdAt │    │
└──────┬───────┘    │
       │            │
       │ 1          │
       │            │
       │ has        │
       │            │
       │ many       │
       │            │
┌──────▼────────────▼──┐
│ EventRegistration    │
├──────────────────────┤
│ PK id                │
│ FK eventId           │
│ FK userId (nullable) │
│    name              │
│    rollNumber        │
│    eventTitle        │
│    registeredOn      │
│    createdAt         │
└──────────────────────┘

┌──────────────┐
│ TeamMember   │
├──────────────┤
│ PK id        │
│    name      │
│    role      │
│    year      │
│    sport/    │
│    domain    │
│    phone     │
│    email     │
│    github/   │
│    instagram │
└──────────────┘
```

## 7. Component Hierarchy (Frontend)

```
App
├── Navbar
│   ├── Logo
│   ├── Navigation Links
│   └── User Profile Dropdown
│
├── Home
│   ├── Hero Section
│   └── Club Cards
│
├── Login
│   └── Login/Register Form
│
├── Booking
│   └── Booking Form
│
├── Admin
│   ├── Statistics Cards
│   ├── Booking Requests List
│   └── Event Registrations List
│
├── Event Details
│   ├── Event Information
│   └── Registration Form
│
└── Club Pages (Sports/Technical/Cultural)
    ├── Hero Section
    ├── Events List
    └── Team Members List
```

## 8. API Request Flow

```
┌─────────┐
│  User   │
└────┬────┘
     │
     │ 1. User Action
     ▼
┌─────────────────┐
│ React Component │
└────┬────────────┘
     │
     │ 2. Call API Service
     ▼
┌─────────────────┐
│   API Service   │
│  (api.ts)       │
└────┬────────────┘
     │
     │ 3. HTTP Request
     │    (with JWT token)
     ▼
┌─────────────────┐
│  Express Route  │
└────┬────────────┘
     │
     │ 4. Auth Middleware
     ▼
┌─────────────────┐
│ Auth Middleware │
│ (validate token)│
└────┬────────────┘
     │
     │ 5. Route Handler
     ▼
┌─────────────────┐
│  Business Logic │
│  (Controller)   │
└────┬────────────┘
     │
     │ 6. Database Operation
     ▼
┌─────────────────┐
│    Database     │
│  (database.json)│
└────┬────────────┘
     │
     │ 7. Response
     ▼
┌─────────────────┐
│  JSON Response  │
└────┬────────────┘
     │
     │ 8. Update UI
     ▼
┌─────────────────┐
│ React Component │
│  (State Update) │
└─────────────────┘
```

---

**Note**: These diagrams are text-based representations. For visual UML diagrams, use tools like:
- PlantUML (http://plantuml.com/)
- Draw.io (https://app.diagrams.net/)
- Lucidchart (https://www.lucidchart.com/)

