import React from "react";
import { Calendar, Clock, MapPin, User, Phone } from "lucide-react";

export function AppointmentsScreen() {
  const upcomingAppointment = {
    type: "Follow-up Consultation",
    date: "Monday, December 2, 2025",
    time: "10:00 AM",
    doctor: "Dr. Sarah Johnson",
    location: "Medical Center, Room 304",
    status: "Confirmed",
  };

  const appointments = [
    {
      type: "Post-Surgery Check-up",
      date: "Dec 2, 2025",
      time: "10:00 AM",
      doctor: "Dr. Sarah Johnson",
      status: "Confirmed",
    },
    {
      type: "Wound Care",
      date: "Dec 9, 2025",
      time: "2:30 PM",
      doctor: "Nurse Jennifer Lee",
      status: "Scheduled",
    },
    {
      type: "Final Check-in",
      date: "Dec 20, 2025",
      time: "11:00 AM",
      doctor: "Dr. Sarah Johnson",
      status: "Scheduled",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "var(--success-green)";
      case "Scheduled":
        return "var(--primary-blue)";
      default:
        return "var(--muted-text)";
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-light)",
        paddingBottom: "88px",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "var(--bg-white)",
          padding: "16px",
          paddingTop: "24px",
          borderBottom: "1px solid var(--border-grey)",
        }}
      >
        <h2>Appointments</h2>
      </div>

      <div style={{ padding: "16px" }}>
        {/* Upcoming Appointment Card */}
        <div
          style={{
            backgroundColor: "var(--primary-blue)",
            borderRadius: "16px",
            padding: "20px",
            marginBottom: "24px",
            color: "white",
            boxShadow: "0 4px 16px rgba(37, 99, 235, 0.3)",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "6px 12px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              marginBottom: "12px",
            }}
          >
            <p className="caption" style={{ color: "white" }}>
              Next Appointment
            </p>
          </div>

          <h3 style={{ marginBottom: "16px", color: "white" }}>
            {upcomingAppointment.type}
          </h3>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Calendar size={20} style={{ opacity: 0.9 }} />
              <p>{upcomingAppointment.date}</p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Clock size={20} style={{ opacity: 0.9 }} />
              <p>{upcomingAppointment.time}</p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <User size={20} style={{ opacity: 0.9 }} />
              <p>{upcomingAppointment.doctor}</p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <MapPin size={20} style={{ opacity: 0.9 }} />
              <p>{upcomingAppointment.location}</p>
            </div>
          </div>

          <button
            style={{
              width: "100%",
              backgroundColor: "white",
              color: "var(--primary-blue)",
              padding: "12px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              fontWeight: "500",
              marginTop: "16px",
            }}
          >
            Get Directions
          </button>
        </div>

        {/* All Appointments */}
        <div style={{ marginBottom: "16px" }}>
          <h3 style={{ marginBottom: "12px" }}>All Appointments</h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {appointments.map((appointment, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "var(--bg-white)",
                  borderRadius: "16px",
                  padding: "16px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    marginBottom: "12px",
                  }}
                >
                  <h3 style={{ flex: 1 }}>{appointment.type}</h3>
                  <div
                    style={{
                      padding: "4px 12px",
                      borderRadius: "8px",
                      backgroundColor:
                        getStatusColor(appointment.status) + "15",
                      color: getStatusColor(appointment.status),
                    }}
                    className="caption"
                  >
                    {appointment.status}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Calendar
                      size={16}
                      style={{ color: "var(--muted-text)" }}
                    />
                    <p style={{ color: "var(--muted-text)" }}>
                      {appointment.date}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Clock size={16} style={{ color: "var(--muted-text)" }} />
                    <p style={{ color: "var(--muted-text)" }}>
                      {appointment.time}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <User size={16} style={{ color: "var(--muted-text)" }} />
                    <p style={{ color: "var(--muted-text)" }}>
                      {appointment.doctor}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Card */}
        <div
          style={{
            backgroundColor: "var(--bg-white)",
            borderRadius: "16px",
            padding: "16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ marginBottom: "12px" }}>Need to Reschedule?</h3>
          <p style={{ color: "var(--muted-text)", marginBottom: "16px" }}>
            Contact our scheduling team
          </p>
          <button
            style={{
              width: "100%",
              backgroundColor: "var(--bg-light)",
              color: "var(--primary-blue)",
              padding: "12px",
              borderRadius: "12px",
              border: "1px solid var(--primary-blue)",
              cursor: "pointer",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <Phone size={20} />
            Call (555) 123-4567
          </button>
        </div>
      </div>
    </div>
  );
}
