VERSION 1.0 CLASS
BEGIN
  MultiUse = -1  'True
END
Attribute VB_Name = "ChassisClass"
Attribute VB_Creatable = True
Attribute VB_Exposed = True
Public ChassisType As Integer
Public ChassisName As String
Public Handling As Integer        ' OnRoad handling
Public OffRoad As Integer         ' OffRoad handling
Public Body As Integer            ' Body
Public Armour As Integer          ' Armour
Public CF As Integer              ' Starting CF
Public CFMax As Integer           ' Max CF
Public Autonav As Integer         ' Autonav level
Public Pilot As Integer           ' Pilot level
Public Sensor As Integer          ' Sensor level
Public Seating As String          ' Seating arrangement
Public Entry As String            ' Entry points
Public SetupTime As Integer       ' Setup/Breakdown
Public TOL As String              ' Takeoff/landing profile
Public Other As String            ' Accessories
Public Cost As Integer            ' Design points
Public EngineC As New Collection  ' Engine specs for this chassis

Public Book As String   ' where's it from?

Public Property Get Value(var As Variant)
    Select Case var
        Case "ChassisType"
            Value = ChassisType
        Case "ChassisName"
            Value = "'" & ChassisName & "'"
        Case "Handling"
            Value = Handling
        Case "OffRoad"
            Value = OffRoad
        Case "Body"
            Value = Body
        Case "Armour"
            Value = Armour
        Case "CF"
            Value = CF
        Case "CFMax"
            Value = CFMax
        Case "Autonav"
            Value = Autonav
        Case "Pilot"
            Value = Pilot
        Case "Sensor"
            Value = Sensor
        Case "Seating"
            Value = "'" & Seating & "'"
        Case "Entry"
            Value = "'" & Entry & "'"
        Case "SetupTime"
            Value = SetupTime
        Case "TOL"
            Value = "'" & TOL & "'"
        Case "Other"
            Value = "'" & Other & "'"
        Case "Cost"
            Value = Cost
    End Select
End Property

Public Property Let Value(var As Variant, val As Variant)
    Select Case var
        Case "ChassisType"
            ChassisType = val
        Case "ChassisName"
            ChassisName = val
        Case "Handling"
            Handling = val
        Case "OffRoad"
            OffRoad = val
        Case "Body"
            Body = val
        Case "Armour"
            Armour = val
        Case "CF"
            CF = val
        Case "CFMax"
            CFMax = val
        Case "Autonav"
            Autonav = val
        Case "Pilot"
            Pilot = val
        Case "Sensor"
            Sensor = val
        Case "Seating"
            Seating = val
        Case "Entry"
            Entry = val
        Case "SetupTime"
            SetupTime = val
        Case "TOL"
            TOL = val
        Case "Other"
            Other = val
        Case "Cost"
            Cost = val
    End Select
End Property
