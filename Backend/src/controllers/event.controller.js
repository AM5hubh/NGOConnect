import { Event } from "../models/event.model.js";

// Create new event
const createEvent = async (req, res) => {
  try {
    // Verify if the user is an NGO
    // if (req.user.role !== "ngo") {
    //   return res.status(403).json({ message: "Only NGOs can create events" });
    // }

    const eventData = {
      ...req.body,
      // ngoId: "",
      status: "upcoming",
    };

    const event = new Event(eventData);
    await event.save();

    res.status(201).json({
      success: true,
      data: event,
      message: "Event created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get NGO's events
const getNGOEvents = async (req, res) => {
  try {
    const events = await Event.find({});

    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, ngoId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found or unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
      message: "Event updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({
      _id: req.params.id,
      ngoId: req.user.id,
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found or unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createEvent, getNGOEvents, updateEvent, deleteEvent };
